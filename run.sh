#!/bin/bash

# 前端学习平台 - 快捷启动脚本
# ================================

# 获取脚本所在目录（支持从任意位置运行）
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

PROJECT_DIR="."
PID_FILE=".dev-server.pid"
LOG_FILE=".dev-server.log"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 打印 Logo
print_logo() {
    echo -e "${CYAN}"
    echo "  ╔═══════════════════════════════════════╗"
    echo "  ║   🎓 前端学习平台 - 快捷启动工具      ║"
    echo "  ╚═══════════════════════════════════════╝"
    echo -e "${NC}"
}

# 获取服务器状态
get_status() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        if ps -p "$pid" > /dev/null 2>&1; then
            echo "running"
            return 0
        fi
    fi
    echo "stopped"
    return 1
}

# 获取运行端口
get_port() {
    if [ -f "$LOG_FILE" ]; then
        grep -o "localhost:[0-9]*" "$LOG_FILE" | tail -1 | cut -d':' -f2
    fi
}

# 打印菜单
print_menu() {
    local status=$(get_status)
    local port=$(get_port)
    
    echo -e "${YELLOW}═══════════════ 服务管理 ═══════════════${NC}"
    echo ""
    if [ "$status" = "running" ]; then
        echo -e "  服务状态: ${GREEN}● 运行中${NC}  访问: ${CYAN}http://localhost:${port:-5173}${NC}"
    else
        echo -e "  服务状态: ${RED}○ 已停止${NC}"
    fi
    echo ""
    echo -e "  ${GREEN}1)${NC} 🚀 启动服务 (前台)     ${PURPLE}npm run dev${NC}"
    echo -e "  ${GREEN}2)${NC} 🚀 启动服务 (后台)     ${PURPLE}nohup npm run dev &${NC}"
    echo -e "  ${GREEN}3)${NC} 🛑 停止服务            ${PURPLE}kill \$(cat .pid)${NC}"
    echo -e "  ${GREEN}4)${NC} 🔄 重启服务            ${PURPLE}stop && start${NC}"
    echo -e "  ${GREEN}5)${NC} 📋 查看日志            ${PURPLE}tail -f .dev-server.log${NC}"
    echo ""
    echo -e "${YELLOW}═══════════════ 项目管理 ═══════════════${NC}"
    echo ""
    echo -e "  ${GREEN}6)${NC} 📦 安装依赖            ${PURPLE}npm install${NC}"
    echo -e "  ${GREEN}7)${NC} 🔨 构建生产版本        ${PURPLE}npm run build${NC}"
    echo -e "  ${GREEN}8)${NC} 👀 预览生产版本        ${PURPLE}npm run preview${NC}"
    echo -e "  ${GREEN}9)${NC} 🧹 清理 node_modules   ${PURPLE}rm -rf node_modules${NC}"
    echo -e "  ${GREEN}10)${NC} 🔄 重装依赖           ${PURPLE}rm -rf node_modules && npm install${NC}"
    echo -e "  ${GREEN}11)${NC} 📊 查看项目信息"
    echo ""
    echo -e "  ${GREEN}0)${NC} 🚪 退出"
    echo ""
}

# 检查项目目录
check_project() {
    if [ ! -f "package.json" ]; then
        echo -e "${RED}❌ 错误: 找不到 package.json，请确保脚本在项目根目录${NC}"
        exit 1
    fi
}

# 启动开发服务器 (前台)
start_foreground() {
    if [ "$(get_status)" = "running" ]; then
        echo -e "${YELLOW}⚠ 服务已在运行中，请先停止${NC}"
        return
    fi
    echo -e "${BLUE}🚀 启动开发服务器 (前台模式)...${NC}"
    echo -e "${YELLOW}按 Ctrl+C 停止服务器${NC}"
    echo ""
    cd "$PROJECT_DIR"
    npm run dev
}

# 启动开发服务器 (后台)
start_background() {
    if [ "$(get_status)" = "running" ]; then
        echo -e "${YELLOW}⚠ 服务已在运行中${NC}"
        local port=$(get_port)
        echo -e "访问地址: ${CYAN}http://localhost:${port:-5173}${NC}"
        return
    fi
    echo -e "${BLUE}� 项启动开发服务器 (后台模式)...${NC}"
    cd "$PROJECT_DIR"
    nohup npm run dev > "../$LOG_FILE" 2>&1 &
    local pid=$!
    echo $pid > "../$PID_FILE"
    cd ..
    sleep 2
    
    if ps -p $pid > /dev/null 2>&1; then
        local port=$(get_port)
        echo -e "${GREEN}✓ 服务已启动${NC}"
        echo -e "  PID: ${CYAN}$pid${NC}"
        echo -e "  访问: ${CYAN}http://localhost:${port:-5173}${NC}"
        echo -e "  日志: ${CYAN}$LOG_FILE${NC}"
    else
        echo -e "${RED}✗ 启动失败，请查看日志${NC}"
    fi
}

# 停止服务
stop_server() {
    if [ "$(get_status)" = "stopped" ]; then
        echo -e "${YELLOW}⚠ 服务未在运行${NC}"
        return
    fi
    echo -e "${BLUE}🛑 停止服务...${NC}"
    local pid=$(cat "$PID_FILE")
    kill $pid 2>/dev/null
    # 同时杀掉子进程 (node)
    pkill -P $pid 2>/dev/null
    rm -f "$PID_FILE"
    echo -e "${GREEN}✓ 服务已停止${NC}"
}

# 重启服务
restart_server() {
    echo -e "${BLUE}🔄 重启服务...${NC}"
    stop_server
    sleep 1
    start_background
}

# 查看日志
view_logs() {
    if [ ! -f "$LOG_FILE" ]; then
        echo -e "${YELLOW}⚠ 日志文件不存在${NC}"
        return
    fi
    echo -e "${BLUE}📋 查看日志 (按 Ctrl+C 退出)${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    tail -f "$LOG_FILE"
}

# 安装依赖
install_deps() {
    echo -e "${BLUE}📦 安装依赖...${NC}"
    cd "$PROJECT_DIR"
    npm install
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
}

# 构建生产版本
build_prod() {
    echo -e "${BLUE}🔨 构建生产版本...${NC}"
    cd "$PROJECT_DIR"
    npm run build
    echo -e "${GREEN}✓ 构建完成，输出目录: $PROJECT_DIR/dist${NC}"
}

# 预览生产版本
preview_prod() {
    echo -e "${BLUE}👀 预览生产版本...${NC}"
    cd "$PROJECT_DIR"
    if [ ! -d "dist" ]; then
        echo -e "${YELLOW}⚠ dist 目录不存在，先执行构建...${NC}"
        npm run build
    fi
    echo -e "${GREEN}✓ 预览服务器启动中...${NC}"
    npm run preview
}

# 清理 node_modules
clean_modules() {
    echo -e "${BLUE}🧹 清理 node_modules...${NC}"
    cd "$PROJECT_DIR"
    rm -rf node_modules
    rm -rf .vite
    echo -e "${GREEN}✓ 清理完成${NC}"
}

# 重装依赖
reinstall() {
    echo -e "${BLUE}🔄 重装依赖...${NC}"
    cd "$PROJECT_DIR"
    rm -rf node_modules
    rm -rf .vite
    npm install
    echo -e "${GREEN}✓ 重装完成${NC}"
}

# 查看项目信息
show_info() {
    echo -e "${CYAN}📊 项目信息${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "项目目录: ${GREEN}$PROJECT_DIR${NC}"
    
    if [ -f "$PROJECT_DIR/package.json" ]; then
        echo -e "项目名称: ${GREEN}$(grep '"name"' $PROJECT_DIR/package.json | head -1 | cut -d'"' -f4)${NC}"
        echo -e "Vue 版本: ${GREEN}$(grep '"vue"' $PROJECT_DIR/package.json | head -1 | cut -d'"' -f4)${NC}"
    fi
    
    local status=$(get_status)
    if [ "$status" = "running" ]; then
        local pid=$(cat "$PID_FILE")
        local port=$(get_port)
        echo -e "服务状态: ${GREEN}运行中 (PID: $pid, 端口: ${port:-5173})${NC}"
    else
        echo -e "服务状态: ${RED}已停止${NC}"
    fi
    
    if [ -d "$PROJECT_DIR/node_modules" ]; then
        echo -e "依赖状态: ${GREEN}已安装${NC}"
    else
        echo -e "依赖状态: ${RED}未安装${NC}"
    fi
    
    if [ -d "$PROJECT_DIR/dist" ]; then
        echo -e "构建状态: ${GREEN}已构建${NC}"
    else
        echo -e "构建状态: ${YELLOW}未构建${NC}"
    fi
    
    echo -e "项目路径: ${GREEN}$SCRIPT_DIR${NC}"
    
    echo ""
    echo -e "${CYAN}📚 课程统计${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  HTML 基础:    8 课时"
    echo "  CSS 样式:     7 课时"
    echo "  JavaScript:   8 课时"
    echo "  Vue 框架:     6 课时"
    echo "  实战进阶:     8 课时"
    echo "  ─────────────────────"
    echo -e "  ${GREEN}总计: 37 课时${NC}"
    echo ""
}

# 主循环
main() {
    check_project
    
    while true; do
        clear
        print_logo
        print_menu
        
        read -p "请输入选项 [0-11]: " choice
        echo ""
        
        case $choice in
            1) start_foreground ;;
            2) start_background; read -p "按回车继续..." ;;
            3) stop_server; read -p "按回车继续..." ;;
            4) restart_server; read -p "按回车继续..." ;;
            5) view_logs ;;
            6) install_deps; read -p "按回车继续..." ;;
            7) build_prod; read -p "按回车继续..." ;;
            8) preview_prod ;;
            9) clean_modules; read -p "按回车继续..." ;;
            10) reinstall; read -p "按回车继续..." ;;
            11) show_info; read -p "按回车继续..." ;;
            0) echo -e "${GREEN}👋 再见！${NC}"; exit 0 ;;
            *) echo -e "${RED}无效选项，请重新选择${NC}"; sleep 1 ;;
        esac
    done
}

# 运行
main
