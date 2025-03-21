#!/bin/bash

# 配置参数
BASE_PORT=3001                # ZK Prover 基础端口
BASE_API_PORT=8080           # Points API 基础端口
GRPC_URL="34.31.74.109:9090" # Layer Edge gRPC endpoint
CONTRACT_ADDR="cosmos1ufs3tlq4umljk0qfe8k5ya0x6hpavn897u2cnf9k0en9jr7qarqqt56709"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查是否已下载 Go
check_go_downloaded() {
    if [ -d "/usr/local/go" ]; then
        echo -e "${GREEN}✓ Go 已下载${NC}"
        return 0
    fi
    return 1
}

# 检查是否已下载 Rust
check_rust_downloaded() {
    if [ -d "$HOME/.cargo" ] && [ -f "$HOME/.cargo/bin/rustc" ]; then
        echo -e "${GREEN}✓ Rust 已下载${NC}"
        return 0
    fi
    return 1
}

# 检查是否已下载 RISC Zero
check_risc_zero_downloaded() {
    if [ -f "$HOME/.local/bin/rzup" ] || command -v rzup &> /dev/null; then
        echo -e "${GREEN}✓ RISC Zero 已下载${NC}"
        return 0
    fi
    return 1
}

# 检查 Go 版本
check_go_version() {
    if command -v go &> /dev/null; then
        local go_version=$(go version | awk '{print $3}' | sed 's/go//')
        local required_version="1.18"
        if [ "$(printf '%s\n' "$required_version" "$go_version" | sort -V | head -n1)" = "$required_version" ]; then
            echo -e "${GREEN}✓ Go $go_version 已安装并满足版本要求${NC}"
            return 0
        else
            echo -e "${YELLOW}! Go版本 $go_version 过低，需要 $required_version 或更高版本${NC}"
            return 1
        fi
    fi
    echo -e "${YELLOW}! Go 未安装${NC}"
    return 1
}

# 检查 Rust 版本
check_rust_version() {
    if command -v rustc &> /dev/null; then
        local rust_version=$(rustc --version | awk '{print $2}')
        local required_version="1.81.0"
        if [ "$(printf '%s\n' "$required_version" "$rust_version" | sort -V | head -n1)" = "$required_version" ]; then
            echo -e "${GREEN}✓ Rust $rust_version 已安装并满足版本要求${NC}"
            return 0
        else
            echo -e "${YELLOW}! Rust版本 $rust_version 过低，需要 $required_version 或更高版本${NC}"
            return 1
        fi
    fi
    echo -e "${YELLOW}! Rust 未安装${NC}"
    return 1
}

# 检查 RISC Zero
check_risc_zero() {
    if command -v rzup &> /dev/null; then
        echo -e "${GREEN}✓ RISC Zero 已安装并可用${NC}"
        return 0
    fi
    echo -e "${YELLOW}! RISC Zero 未安装${NC}"
    return 1
}

# 安装 Go
install_go() {
    echo "正在检查 Go 安装状态..."
    
    # 先检查版本，如果已经满足要求就跳过安装
    if check_go_version; then
        return 0
    fi
    
    # 如果已下载但版本不对，先删除旧版本
    if check_go_downloaded; then
        echo "删除旧版本 Go..."
        sudo rm -rf /usr/local/go
    fi
    
    echo "正在下载并安装 Go..."
    wget https://go.dev/dl/go1.18.linux-amd64.tar.gz
    sudo tar -C /usr/local -xzf go1.18.linux-amd64.tar.gz
    rm go1.18.linux-amd64.tar.gz
    
    # 添加 Go 到环境变量
    if ! grep -q "export PATH=\$PATH:/usr/local/go/bin" ~/.bashrc; then
        echo "export PATH=\$PATH:/usr/local/go/bin" >> ~/.bashrc
    fi
    
    # 立即应用环境变量
    export PATH=$PATH:/usr/local/go/bin
    
    if check_go_version; then
        echo -e "${GREEN}Go 安装成功${NC}"
    else
        echo -e "${RED}Go 安装失败${NC}"
        exit 1
    fi
}

# 安装 Rust
install_rust() {
    echo "正在检查 Rust 安装状态..."
    
    # 先检查版本，如果已经满足要求就跳过安装
    if check_rust_version; then
        return 0
    fi
    
    # 如果已下载但版本不对，先删除旧版本
    if check_rust_downloaded; then
        echo "更新 Rust..."
        rustup update
    else
        echo "正在下载并安装 Rust..."
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    fi
    
    source $HOME/.cargo/env
    
    if check_rust_version; then
        echo -e "${GREEN}Rust 安装成功${NC}"
    else
        echo -e "${RED}Rust 安装失败${NC}"
        exit 1
    fi
}

# 安装 RISC Zero
install_risc_zero() {
    echo "正在检查 RISC Zero 安装状态..."
    
    # 检查是否已安装
    if check_risc_zero; then
        return 0
    fi
    
    # 如果已下载但未正确安装，先清理
    if check_risc_zero_downloaded; then
        echo "清理现有 RISC Zero 安装..."
        rm -f $HOME/.local/bin/rzup
    fi
    
    echo "正在下载并安装 RISC Zero 工具链..."
    curl -L https://risczero.com/install | bash
    source ~/.bashrc
    rzup install
    
    if check_risc_zero; then
        echo -e "${GREEN}RISC Zero 安装成功${NC}"
    else
        echo -e "${RED}RISC Zero 安装失败${NC}"
        exit 1
    fi
}

# 检查必要的软件是否安装
check_prerequisites() {
    echo "检查必要的软件..."
    local need_source=0
    
    # 安装必要的软件包
    echo "检查并安装必要的系统包..."
    if ! command -v build-essential &> /dev/null || ! command -v curl &> /dev/null || ! command -v wget &> /dev/null || ! command -v git &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y build-essential curl wget git
    else
        echo -e "${GREEN}✓ 基础开发工具已安装${NC}"
    fi

    # 检查并安装 Go
    if ! check_go_version; then
        install_go
        need_source=1
    fi

    # 检查并安装 Rust
    if ! check_rust_version; then
        install_rust
        need_source=1
    fi

    # 检查并安装 RISC Zero
    if ! check_risc_zero; then
        install_risc_zero
        need_source=1
    fi

    # 如果安装了新软件，重新加载环境变量
    if [ $need_source -eq 1 ]; then
        source ~/.bashrc
    fi
}


# 创建节点配置
create_node_config() {
    local node_id=$1
    local socks5_proxy=$2
    local private_key=$3
    local zk_port=$((BASE_PORT + node_id))
    local api_port=$((BASE_API_PORT + node_id))
    
    cat > config_${node_id}.env <<EOL
GRPC_URL=${GRPC_URL}
CONTRACT_ADDR=${CONTRACT_ADDR}
ZK_PROVER_URL=http://127.0.0.1:${zk_port}
API_REQUEST_TIMEOUT=100
POINTS_API=http://127.0.0.1:${api_port}
PRIVATE_KEY=${private_key}
SOCKS5_PROXY=${socks5_proxy}
EOL
}

# 启动单个节点
start_node() {
    local node_id=$1
    local node_dir="node_${node_id}"
    
    # 创建节点目录
    mkdir -p ${node_dir}
    cp -r risc0-merkle-service ${node_dir}/
    cp light-node ${node_dir}/
    cp config_${node_id}.env ${node_dir}/.env

    echo "启动节点 $node_id..."
    
    # 创建日志目录
    mkdir -p ${node_dir}/logs

    # 启动 RISC0 服务
    cd ${node_dir}/risc0-merkle-service
    SOCKS5_PROXY=$(grep SOCKS5_PROXY ../.env | cut -d= -f2) cargo run > ../logs/risc0.log 2>&1 &
    local risc0_pid=$!
    cd ..

    # 启动 Light Node
    ./light-node > logs/light-node.log 2>&1 &
    local lightnode_pid=$!
    
    # 记录进程ID
    echo "$risc0_pid" > logs/risc0.pid
    echo "$lightnode_pid" > logs/lightnode.pid
    
    cd ..
    
    echo -e "${GREEN}节点 $node_id 启动完成：${NC}"
    echo "RISC0 进程ID: $risc0_pid"
    echo "Light Node 进程ID: $lightnode_pid"
}

# 检查配置文件格式
check_config_format() {
    local config_file=$1
    local line_num=1
    while IFS=',' read -r proxy key || [ -n "$proxy" ]; do
        if [[ ! "$proxy" =~ ^socks5:// ]] || [ -z "$key" ]; then
            echo -e "${RED}错误: 配置文件第 $line_num 行格式错误${NC}"
            echo "正确格式为: socks5://user:pass@host:port,private_key"
            exit 1
        fi
        ((line_num++))
    done < "$config_file"
}

# 主函数
main() {
    # 检查参数
    if [ "$#" -lt 1 ]; then
        echo -e "${RED}错误: 缺少配置文件参数${NC}"
        echo "使用方法: $0 <配置文件>"
        echo "配置文件格式示例:"
        echo "socks5://user1:pass1@host1:port1,private_key1"
        echo "socks5://user2:pass2@host2:port2,private_key2"
        exit 1
    fi

    local config_file=$1

    # 检查配置文件是否存在
    if [ ! -f "$config_file" ]; then
        echo -e "${RED}错误: 配置文件 $config_file 不存在${NC}"
        exit 1
    fi

    # 检查配置文件格式
    check_config_format "$config_file"

    # 检查并安装必要的软件
    check_prerequisites

    # 编译项目
    echo "检查项目编译状态..."
    if [ ! -f "light-node" ] || [ ! -d "risc0-merkle-service/target" ]; then
        echo "正在编译项目..."
        cd risc0-merkle-service
        cargo build
        cd ..
        go build
    else
        echo -e "${GREEN}✓ 项目已编译${NC}"
    fi

    # 计算节点总数
    local num_nodes=$(wc -l < "$config_file")
    echo -e "\n${GREEN}准备启动 $num_nodes 个节点...${NC}"

    # 为每个节点创建配置并启动
    local node_id=1
    while IFS=',' read -r proxy key || [ -n "$proxy" ]; do
        echo -e "\n${GREEN}配置并启动节点 $node_id...${NC}"
        create_node_config $node_id "$proxy" "$key"
        start_node $node_id
        echo -e "${GREEN}节点 $node_id 配置完成，使用代理: $proxy${NC}"
        sleep 5 # 等待节点启动
        ((node_id++))
    done < "$config_file"

    echo -e "\n${GREEN}所有节点已启动完成！${NC}"
    echo -e "\n使用以下命令查看状态："
    echo "1. 查看运行状态：ps aux | grep -E 'light-node|risc0'"
    echo "2. 查看日志：tail -f node_*/logs/*.log"
    echo "3. 查看节点进程ID：cat node_*/logs/*.pid"
}

# 运行主函数
main "$@"