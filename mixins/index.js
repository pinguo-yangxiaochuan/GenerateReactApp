/**
 * 添加设置可编辑状态
 * TODO 通过类的方式实现 不是原型继承
 */ 
export const AddSetEditable = (target) => {

    // 点击其他地方关闭
    const clickOthersCallback = function () {
        let flag = false;
        const configDom = document.querySelector('.index_config');

        this.rootDom.addEventListener('click', () => flag = true);
        configDom.addEventListener('click', () => flag = true);
        document.addEventListener('click', () => flag ? (flag = false) : this.removeEditable())
    };

    // 设置可编辑状态
    target.prototype.setEditable = function () {
        const currClassName = this.state.rootClassName;

        if (!currClassName.includes('editable')){
            this.setState({
                rootClassName: currClassName + ' editable'
            });
        }
    },

    // 取消可编辑状态
    target.prototype.removeEditable = function () {
        this.setState({
            rootClassName: this.state.rootClassName.replace(' editable', '')
        });
    }

    // 组件首次渲染完毕时 设置可编辑状态 并 监听点击其他地方关闭事件 
    target.prototype.componentDidMount = function () {
        this.setEditable();
        clickOthersCallback.call(this);
        this.rootDom.addEventListener('dblclick', () => {
            "use strict";
            this.setEditable();
            this.props.dbClick(this.props.id) // 设置当前编辑状态的组件ID;
        });
    }
}
