## React 学习笔记

> 1）React 只能兼容 iE8 以上的浏览器
>
> 2）注意在 JSX 中插入 JS 语句一定要使用大括号{}括起来 
>
> 3）我们做的是一个单页面应用，所谓单页面应用就是只会加载一个 html 文件。
>
> 4）在 JSX 中 {} 中可以写一个 JS 表达式，注意是表达式，不是一条语句所以结尾不能用分号，而且表达式的结果都会是一个值。
>
> 5）在任意组件中派发的 action 到 store 后，store 会将其转发给所有的 reducer。
>
> 6）项目中有些 react 知识都在新版本中废弃了，所以要找一些博客来看一下，如果面试中还说那些废弃的内容显得对新知识没有追求。

## 4. React 高级内容

### 4.1 React 调试工具

科学上网后在谷歌应用商店安装即可

### 4.2 PropTypes 与 DefaultProps

每个组件都有 props 参数，这个参数是从父组件接收的一些属性，PropTypes 负责做类型校验，DefaultProps 负责设置这些属性的默认值。

当我们需要父组件传递给我们数值时，我们需要的类型是一定的，父组件不能乱传，例如子组件需要一个字符串类型，但是父组件却传递了一个函数，这样肯定会有问题的，所以需要 PropTypes 进行类型校验。

要使用 PropTypes 首先需要引入 PropTypes.

> 使用 create-react-app 创建的 react 项目自动包含了 prop-types 这个包。

```js
import PropTypes from 'prop-types';
```

举例说明：

在 TodoItem 组件中对父组件传递过来的 content 和 deleteItem属性进行参数校验，将下面这段话写在 export 的上面即可。

```js
TodoItem.propTypes = {
  content：PropTypes.string,
  deleteItem: PropTypes.func
}
```

注意就算父组件传递过来的不是类型校验时设置的类型，那么也不会阻止程序的运行，但是会抛出一个警告。

如果不传递 content 那么也不会抛出警告，因为如果没有传递 content 那么就不会进行类型校验。

如果要求某个属性必须要父组件传递过来，可以在进行类型校验时在后面跟上一个 `.isRequired`。

```js
TodoItem.propTypes = {
  content：PropTypes.string.isRequired,
  deleteItem: PropTypes.func
}
```

如果父组件此时仍然没有传递 content 属性，那么就会抛出警告，通过在子组件中设置 content 属性的默认值，就算父组件不传递也可以消除这个警告。

借助 defaultProps 可以实现设置属性的默认值。

```js
TodoItem.defaultProps = {
  content: 'hello world'
}
```

### 4.3 props, state, render 之间的关系

当组件的 state 或者 props 发生改变的时候，render 函数就会重新执行。这个可以这样理解，react 可以实现当数据变化时页面自动跟着变化，那么当 state 或 props 发生变化时那么就说明数据发生变化了，那么 render 函数就会被执行从而导致页面发生变化。

还有一点需要记住的是：当父组件的 render 执行时子组件的reder也会执行。这个可以这样理解，子组件是在父组件的 render 函数中被调用的，当父组件 render 执行时，子组件会被调用，一个组件被调用时，render 函数肯定是会被调用执行的。

### 4.4 React 中的虚拟 DOM

#### 1. 什么是虚拟 DOM

在 React 中实际上是 render 函数中return 的内容会生成 DOM，return 中的内容由两部分组成，一部分是 JSX ，另一部分就是 state 中的数据，所以简单来讲，在 React 中 JSX 结合 state 就生成了 DOM。

现在抛开虚拟 DOM 不谈，如果让我们去实现 React 中当数据发生变化时如何操作 DOM 来实现页面内容的变化，我们会怎样去实现？

**第一种方案：**

1）JSX + state 生成真实的 DOM，并显示在页面上

2）state 发生变化

3）此时 JSX + state 再次结合生成新的真实的 DOM

4）新的 DOM 直接替换掉原来的 DOM

这样页面会发生变化，但是生成真实的 DOM 和在页面上再重新加载新的 DOM 都比较耗性能。

**第二种方案：**

1）JSX + state 生成真实的 DOM，并显示在页面上

2）state 发生变化

3）此时 JSX + state 再次结合生成新的真实的 DOM

4）新的 DOM 和原始的 DOM 作对比，找出差异

5）利用找出的差异，替换掉页面上原始 DOM 的相应部分

此时页面也会发生变化，和方案一相比多了对比步骤但是只需要替换掉原始DOM的一部分即可，综合来说，方案二要优于方案一。

**第三种方案**

1）JSX + state 生成虚拟 DOM（虚拟 DOM 就是一个 JS 对象，用它来描述真实 DOM）

例如下面这段代码：

```html
<div id='abc'>item</div>
```

注意上面的 `div`，`span` 标签时 JSX 语法，并不是真实的 DOM，这里是先生成虚拟 DOM ，然后再下一步的时候才用虚拟 DOM 生成真实的 DOM，由 JSX 到真实的 DOM 中间有一个虚拟 DOM。

```js
JSX -> 虚拟DOM（JS对象） -> 真实DOM
```

也就是说，JSX 需要先转换为 JS 对象，然后再转换为真实的 DOM。

生成的虚拟 DOM 为

```js
['div',{id: 'abc'}, 'item']
```

虚拟 DOM 的格式为

```js
['标签名'，标签属性对象，子标签]
```

那么 `<div id='abc'>item</div>` 是如何转化为 JS 对象的呢？

实际上在 React 中上面这样写就相当于下面这样写：

```js
React.createElement('div', {id: 'abc'}, 'item');

```

那么实际上就算是没有 JSX 语法通过上面这样写也是可以的，但是会非常不方便。

2）用虚拟 DOM 的结构生成真实的 DOM 显示在页面上。

3）JSX + state 生成新的虚拟 DOM

4）两个虚拟 DOM 进行对比，找出差异

5）根据差异直接修改替换页面上的 DOM

虚拟 DOM 是一个 JS 对象，生成一个虚拟 DOM 比生成一个真实的 DOM 结构要容易省时地多，而且两个虚拟 DOM（JS 对象） 之间的对比也比较简单，所以方案三最佳。

React 中使用的也是第三种方案的思想。

#### 2. 虚拟 DOM 的优点

那么虚拟DOM的优点到底有哪些呢？

1）性能提升

这一点通过上面的比较就可以看得出来

2）使得跨端应用得以实现，例如原生应用。

React Native 能够做原生应用虚拟 DOM 是很重要的一方面，原生应用中是没有 DOM 这个概念的，DOM 是浏览器中存在的，但是有了虚拟 DOM（JS 对象） 之后，在原生应用中就可以将虚拟 DOM（JS 对象） 转换为一些原生应用中能够支持的原生组件在原生应用中显示。

#### 3. 虚拟 DOM 的对比

使用虚拟 DOM 时很重要的一个步骤就是两个虚拟 DOM 之间的比较，那么怎样去进行比较呢？

React 中采用 diff 算法，简单来说主要有以下三个方面：

1）当短时间内连续调用多次 setState 时，React 只会进行一次虚拟 DOM 的比对。

我们知道当 state 或者 props 发生变化时，页面会发生变化，实际上 props 的变化也是因为父组件 state 的变化，所以当页面发生变化时实际上是调用 setState 导致数据发生变化变化时。当短时间内连续调用多次 setState 时，如果每次都进行一次虚拟 DOM 的比对，那么性能会比较低，反之多次调用 setState 只进行一次虚拟 DOM 的比对会提升性能。这也是为什么 setState 要设置成异步的原因，因为如果同步的话当执行完一次 setState 时就会发生一次虚拟 DOM 的比对。（同步是顺序立即执行，异步是当所有的同步程序执行完后再执行）

2）在比较虚拟 DOM 时采用逐层同层比较，当上一层出现差异时，那么下面的各层就不需要再比较了，下面各层的 DOM 都将被新的 DOM 替换。

这样做看起来，复用性不是很好，因为下面各层有可能会有许多相同的 DOM。但是这样做会使得比较算法非常简单，比较的速度非常快。

3）设置 key 值

假设现在有一个数组 `[a, b, c]` 遍历每一项显示在页面上，现在数组发生变化将第一项 a 删掉，如果没有 key 值，数组 `[b, c]` 无法和原数组进行比对，例如 b 到底和原数组的哪一个进行比较呢？

但是现在假设有了 key 值，原数组中 a 的 key 值是 a，b 的 key 值是 b，c 的 key 值是 c。删除 a 之后，通过 key 值，b 的 key 值 b 在原数组中找到 b，说明 b 没有发生变化，c 同理也没有发生变化，但是原数组中的 a 在新数组中并没有找到，说明新数组中将 a 删掉了，所以在操作页面时将 a 删掉即可。

这里有一点需要注意的是，key 值一定要选不能变化的，利用数组的索引来做 key 值就不可取。还是以上面为例进行说明。原数组的 a 的 key 值是 0，b 的 key 值是 1，c 的 key 值是 2，删掉 a 后，新数组的 b 的 key 值是 0，c 的 key 值是 1，经过比对原数组的 a 和新数组的 b key 值相同，虚拟 DOM 会认为它们是相同的，没有差异，但是实际上它们是不同的。

### 4.5 React 中 ref 的使用

> ref：reference ，引用，在 React 中使用 ref 来获取 DOM。

在之前做 TodoList 的时候，绑定 onChange 事件之后，在事件处理函数中可以使用 e.target 可以获取到绑定 onChange 事件的那个 DOM 节点。

ref 也可以获取到 React 中的 DOM 节点。

使用方法：

```jsx
<input ref={(Node) => {this.input1=Node}}></input>
```

箭头函数中的参数 Node 就是当前所在的 DOM 节点（input节点），将此节点赋值给 this.input1，在当前组件中通过 this.input1 就可以访问到这个节点。

由于 React 是一个 MVVM 模式，数据变化，页面自动发生变化，所以一般不要直接和 DOM 打交道，所以 ref 能少用就尽量少用。

如果真要用到，注意 **ref 和 setState 结合使用时会有一个坑**。

记住一点，setState 设置 state 时是异步的，所以是先获取到 ref 然后才会改变 state，所以获取到的 DOM 节点是 state 改变之前的 DOM 节点。要想获得 state 改变之后的 DOM 节点可以将打印 ref 节点的语句写在 setState 的第二个参数中，setState 的第二个参数也是一个箭头函数，将打印获取到的 DOM 节点的语句放在箭头函数体中即可。

### 4.6 React 中生命周期函数

> React 16.0 中废弃了一些生命周期函数: 例如 componentWillReceiveProps, componentWillUpdate

![React生命周期函数](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/React生命周期函数.png)

> 生命周期函数指在某一时刻组件会自动调用执行的函数。

**Initialization（初始化）**

组件做一些初始化（state等），实际上是在 constructor 函数中进行的初始化操作。

**Mounting（挂载）**

componentWillMount：当组件即将被挂载到页面上时执行

componentDidMount：组件被挂载到页面上之后执行

> 注意是挂载，也就是将DOM元素展示在页面，只有第一次时执行，后面的都是改变页面中的某些DOM元素，并不会再次执行componentWillMount和componentDidMount，而只会执行render函数，render函数是只要数据发生变化需要改变页面时就会执行。

**Updation**

组件更新发生在数据变化时，也就是 props 或 state 发生变化时。

shouldComponentUpdate：组件被更新之前自动执行（实际上这里是个疑问句，组件是否应该被更新？很显然要返回一个布尔值来说明组件是否应该被更新）

componentWillUpdate: 当 shouldComponentUpdate 返回 true ，组件即将被更新时自动调用执行，如果 shouldComponentUpdate 返回 false，将不会执行 componentWillUpdate。

componentDidUpdate：当组件更新完成之后会被自动调用执行。

上面的这几个函数是当 props 或 state 发生改变时共有的，除此之外 props 还有 componentWillReceiveProps 这个生命周期函数。

componentWillReceiveProps：当一个组件从父组件接收了参数，如果这个组件第一次存在于父组件中，不会执行，如果这个组件之前已经存在于父组件中，才会执行。（这样来理解，主要这里讲的是 updation，所以只有当数据发生变化时才会执行，子组件第一次出现是在 mounting 的阶段完成的，只有当第二次改变 props，第一次子组件从父组件接收的 props 可以理解为赋值，第二次和第一次做比较才可以说是发生了改变。）

**Unmounting**

componentWillUnmount：当组件即将从页面中卸载时执行。（例如某个子组件即将从页面上删除时，componentWillUnmount 将会被执行。）

### 4.7 生命周期函数的使用场景

render 生命周期函数在一个组件中是必须存在的，因为在 React 中所有的组件都默认继承自 Component 组件，Component 组件内部内置了其它的生命周期函数，所以在一个组件中不能不写 render 函数，但是可以不写其它的生命周期函数。

**面试题：shouldComponentUpdate 是什么意思，有什么应用？**

**当父组件的 render 执行时，子组件的 render 也会被执行。**很显然，当父组件传递给子组件的值没有变化时，子组件 render 是没有必要运行的，那么怎样去优化呢？

利用 shouldComponentUpdate 方法，在子组件中加上这个方法。

```js
shouldComponentUpdate(nextProps, nextstate) {
  if(nextProps.content(父组件传递过来的属性) != nextProps.content(父组件传递过来的属性)) {
    return true;
  } else {
    return false;
  }
}

// 写成条件运算符的形式
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.content(父组件传递过来的属性) !== nextProps.content(父组件传递过来的属性);
}

```

`nextProps` 表示 props 要变成什么样，`nextState` 表示 state 要变成什么样。

上面这样写之后，当 props 没有发生改变时子组件就不需要再执行 render 函数了，虽然经过 diff 算法之后子组件也找不到虚拟 DOM 的差别，但是两个虚拟 DOM 的比对也是需要时间的，经过上面的处理之后，虚拟 DOM 的比对过程也可以省略了。

**面试题：在 react 中发送 Ajax 请求时应该放在哪个生命周期函数中为什么？**

发送 Ajax 请求的代码一般只需要执行一次，所以 render 中并不适合。

componentWillMount 看似可以，我们在写网页时将 Ajax 请求放在里面是没有任何问题的，但是当我们去写 React Native 或者服务器端的重构这些高级应用时，可能会和一些更高端的技术产生冲突。

constructor 中也可以，Dell 老师也没有举出哪里不好的例子。

componentDidMount 是最合适的，也是 Dell 老师极力推荐的。之前的时候会有这样一个疑问，componentDidMount 是在 render 之后的，这样的话在页面渲染完成了，需要的 Ajax 数据还没有呀，其实本来 Ajax 数据填充到页面上就是最后，因为它是异步的，所以将其放到 render 函数之后也可以。

像 Updatation 中的那些生命周期函数中就不是很合适了，因为只有当数据发生变化时，那些生命周期函数才会执行。

ComponentWillUnmount 就更不合适了。

React 中并没有内置发送 Ajax 的库，一般我们需要借助 axios 这个第三方的库。

利用 npm 安装完成之后使用非常简单。

```js
componentDidMount() {
  axios.get('/api/todolist')
  	.then(alert('succ'))
  	.catch(alert('error'))
}
```

### 4.8 使用 Charles 实现本地数据 mock

使用 Charles 的 LocalMap 功能，将我们要访问的地址映射到本地的一个文件。

在真正做前端项目时一般都将需要请求的数据放到 public 这个文件夹下的文件中，使用 Ajax 时直接请求访问这个文件夹下的文件就可以了。

### 4.9 React 中的 CSS 过渡动画

在组件中直接通过 `import './style.css'` 引入 css 样式即可，注意在 JSX 中类要写成 `className` 。

CSS 过渡动画使用 `transition` 来实现。

```css
.show {
  transition: all 1s ease-in;
}

```

### 4.10 React 中使用 CSS 动画效果

关于 CSS 动画这一部分可以参考《全面系统讲解CSS》6.5 节笔记。

### 4.11 使用 react-transition-group 库实现动画

> react-transition-group 有三个component，分别是 Transition，CSSTransition，TransitionGroup

安装 react-transition-group 库

```bash
npm install react-transition-group --save

```

使用

```js
import { CSSTransition } from 'react-transition-group';

```

在需要添加动画的地方用 CSSTransion 这个组件包裹起来，并且设置一些属性。

```js
<CSSTransition
	in={this.state.show} // 动画开始的信号，当show改变时就会触发动画,false->true 执行入场动画，true->false执行出场动画
	timeout={1000} // 动画的时长
	classNames='fade' // 通过fade这个类来设置入场和出场时的动画
	unmountOnExit // 当隐藏后，DOM也从页面上消失，下面的DOM元素可以补上来
  onEntered={(el)=>{el.style.color='blue'}} // 当入场动画执行完后自动执行后面的箭头函数
  apper={true} // 第一次显示时也会有入场动画
>
  <div>hello</div>
</CSSTransition>

```

**一定要注意在 CSSTransition 中设置类用的是 className 而不是 className，因为实际上是设置了 6 个类，如下所述。**

下面就需要在 style.css 中设置具体的动画。

```css
/*入场动画执行的第一个时刻的样式*/
.fade-enter {
  opacity: 0;
}
/*入场动画执行的第二个时刻到入场动画执行完成前的时间内的动画样式*/
.fade-enter-active {
  opacity: 1;
  transition: opacity 1s ease-in;
}
/*入场动画执行完成之后的样式*/
.fade-enter-done {
  opacity: 1;
}

/*出场动画执行的第一个时刻的样式*/
.fade-exit {
  opacity： 1;
}
/*出场动画执行的第二个时刻到出场动画执行完成前的时间内的动画样式*/
.fade-exit-active {
  opacity: 0;
  transition: opacity 1s ease-in
}
/*出场动画执行完成之后的样式*/
.fade-exit-done {
  opacity: 0;
}
```

利用 react-transition-group 实现多个元素之间的动画效果

state 中存放一个list数组

```js
constructor(props) {
  super(props);
  this.state={
    list: []
  }
}

```

下面的代码实现每点击一次 toggle 时页面上增加一个 `item`，如何实现每次增加 `item` 时都有动画效果呢？

```jsx
<Fragment>
  {
  	this.state.list.map((item) => {
    	return <div key={item}>{item}</div>
 	 })
  }
  <button
    onClick={this.handleAddItem}      
  >
    toggle
  </button>
</Fragment>

handleAddItem() {
	this.setState((prevState) => {
		return {
			list: [...prevState.list, 'item']
		}
  })
}

```

实现方法也比较简单，现在需要引入 TransitionGroup 这个组件

```js
import { CSSTransition, TransitionGroup } from 'react-transition-group';

```

利用 TransitionGroup 包裹一组需要添加动画效果的元素，每个元素上还要添加一个 CSSTransition。

```jsx
<TransitionGroup>
  {
    this.state.list.map((item) => {
      return (
      	<CSSTransition
          timeout={1000} 
          classNames='fade' 
          unmountOnExit 
          onEntered={(el)=>{el.style.color='blue'}} 
          apper={true} 
        >
          <div key={item}>{item}</div>
        </CSSTransition>
      )
    })
	}
</TransitionGroup>

```

## 5. Redux 入门

### 5.1 Redux 概念简述

React 自身只是一个视图层的框架，组件之间的传值是很不方便的，尤其不是上下级的组件之间数据的传递更麻烦，所以只用 React 是没有办法做大型的应用的，需要和数据层的框架进行配合。

目前比较流行的数据层框架是 Redux，它的核心思想是将所有组件的数据都不放在组件中了，而是放在一个公用的容器 store 中，如下图右侧所示，当蓝色的组件需要将数据传递给其它的组件时，只需要改变蓝色组件存在 store 中的数据，然后其它的组件会自动感知到变化来获取新的数据。

![Redux数据传递](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Redux数据传递.png)

实际上 Redux = Reducer + Flux。

> 关于 Flux 的介绍可以参考程墨老师的 《深入浅出React和Redux》，印象中Redux只是Flux的一次升级，而且变化并不是很大。

### 5.2 Redux 的工作流程

![1584628842105](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Redux工作流程1.png)

根据 Redux 的原理来理解 Redux 的工作流程，Redux 的原理就是多了一个 state 来存放组件的数据，那么一个组件想要获取store中的某个数据，首先需要告诉 store 我要获取数据，这个请求就对应图中的一个 action，ActionCreators 将这个 action 派发给 Store，Store 本身并不知道应该怎样办，它只是一个容器用来存储的，所以它将前一时刻的 state（previousState）和派发过来的 action 发送给 Reducers，Reducer 接收到 previousState 和 action 之后，作出相应的逻辑处理，然后将处理结果（新的state，newState）再发送给 store，然后 store 再告诉组件你的请求已经处理完了可以来获取数据了。

注意最后一步应该不是 Store 告诉组件请求已经处理完了，而应该是 store 中的数据发生变化时，组件会自动感知到，然后去 Store 中获取数据。

### 5.3 使用 Antd 实现 TodoList 页面布局

> antd 官网 https://github.com/ant-design/ant-design/blob/master/README-zh_CN.md

首先创建一个 TodoList 组件

````jsx
import React, { Component } from 'react';

class TodoList extends Component {
  
  render() {
    return (
      
      <div>hello world</div>
    )
  }
}

export default TodoList;
````

安装 [antd](https://github.com/ant-design/ant-design/blob/master/README-zh_CN.md)

```bash
npm install antd --save
```

使用 [antd](https://github.com/ant-design/ant-design/blob/master/README-zh_CN.md)，引入 abtd 的样式文件。

假设现在我们要使用 Input 输入框，首先需要引入 Input 输入框，然后再在 render 函数中使用这个Input 组件即可，具体属性设置细节可以参考官网。

使用 List 列表，首先引入 List 和 Typography，然后将列表中的数据粘贴到 import 的下面让其成为组件内的全局变量。具体代码见 [List 组件官网教程](https://ant.design/components/list/#header)。

```jsx
import React, { Component, Fragment } from 'react';
// 引入 antd 的样式文件
import 'antd/dist/antd.css';
// 引入 antd 组件
import { Input, Button, List } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class TodoList extends Component {

  render() {
    return (
      <Fragment>
        <div style={{marginLeft: '10px', marginTop: '10px'}}>
          { /* 使用Input组件 */}
          <Input placeholder='todo info' style={{width: '300px', marginRight: '10px'}} />
          { /* 使用Button组件 */}
          <Button type='primary'>submit</Button>
          <List
            style={{marginLeft: '10px', marginTop: '15px', width: '300px'}}
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </div>
      </Fragment>
    )
  }
}

export default TodoList;
```

代码结果

![1584668110577](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/1584668110577.png)

Ant Designer 一般用来做后台的界面设计，使用非常广泛。

### 5.4 创建 Redux 中的 store

根据下面这张 redux 工作流程图，来创建 store 和 reducer，并且将二者联系起来。

![Redux工作流程](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Redux工作流程1.png)

首先需要安装 Redux

```bash
npm install redux
```

**创建一个 store**，并导出这个 store

```js
import { createStore } from 'redux';

const store = createStore();

export default store;
```

和 store 紧密相连是 reducer，在 store 接收到派发过来的 action 时，它并不知道应该如何处理，它需要将当前的 state 和派发过来的 action 传递给 reducer，reducer 经过一些逻辑处理后再返回给 store 一个新的 state。

从上面的分析可以看出，store 只是一个存放 state 的容器，因此通过 `createStore()` 创建一个容器即可。

reducer 需要接收 state 和 action，并且经过逻辑处理之后还要返回新的 state，从它的种种特征来看它就是一个函数。

**创建 reducer**

```js
export default (state, action) => {
  return state;
}
```

上面这个是最简单的 reducer，一般情况下 store 中的 state 需要有一个默认值，可以在 reducer 中设置这个默认值。

```js
const defaultState = {};
export default (state = defaultState, action) => {
  return state;
}
```

**将 store 和 reducer 联系起来**

现在 store 和 reducer 都是分离的，需要将两者之间联系起来，方式是在创建 store 时将 reducer 作为 `createStore` 的参数。

```js
import { createStore } from 'redux';
import reducer from './reducer';

export const store = createStore(reducer);
```

在其它组件中想要使用 store 中的数据，只需要将创建好的 store 引入，然后再使用 store 中的数据即可。

假设现在 store 中存储了一个 data 数据，我们现在要在某个组件中获取这个 data 数据。首先在那个组件中引入 store，store 中的数据可以通过 `store.getStore()` 来获取，在 constructor 中利用 `this.state = store.getState()`，这时组件的 state 就是 store 中的 state，store 中的 data 数据在组件中就可以利用 `this.state.data` 来获取。  

```js
import store from './store/index.js';

class TodoList extends Component {
  
  constructor(props) {
  	super(props);
    this.state = store.getState();
    console.log(this.state.data);
  }
}
```

### 5.5 Action 和 Reducer 的编写

在 chrome 浏览器中使用 Redux-DevTools 工具辅助调试，添加完这个插件之后并不能直接使用，需要参考 [Redux-DevTools 官网](https://github.com/zalmoxisus/redux-devtools-extension) 的使用指南。

在创建 store 时需要在参数中加上 `window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()` 按照这条与运算语句的意思就是如果存在 Redux_DevTools，那么就运行 Redux_DevTools.

```js
 const store = createStore(
   reducer, 
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
```

成功之后界面如下图所示：

![Redux_DevTools使用界面](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Redux_DevTools使用界面.png)

**现在有一个需求是当输入框中的值变化时改变 store 中的 inputValue 的值。**

根据 Redux 的工作流程图，我们知道需要先创建一个 action，action 实际上是一个对象，其中有一个属性 type，要描述一下需要 store 做什么事情，还有其它的属性就不是确定的了，要根据实际情况。就这个例子而言，需要将输入框中的数值传递过去。

```js
handleInputChange(e) {
  const action = {
    type: 'change_input_value',
    value: e.target.value
  }
}
```

这个 action 要告诉 store，我请求做的事情是改变 input_value 的数值，改变的数值为 e.target.value.

现在要将这个 action 传递给 store，store 提供了一个 dispatch 方法可以实现将 action 传递给 store。

> 注意 dispatch 是 store 提供的方法而不是组件提供的方法，注意调用 dispatch 时的前缀是 store 而不是 this。

```js
handleInputChange(e) {
  const action = {
    type: 'change_input_value',
    value: e.target.value
  };
 	store.dispatch(action);
}
```

当 store 接收到 action 之后，store 会自动地将当前的 state 和接收到的 action 传递给 Reducer。

注意这个过程是自动的，现在我们来验证一下，当利用 dispach 将 action 派发之后，reducer 就会接收到 store 传递过来的 state 和 action。

```js
// reducer.js
const defaultState = {
  inputValue: '1',
  list: [1, 3],
  data: [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed common'
  ]
}

export default (state = defaultState, action) => {
  // 验证 state 和 action 有没有传递过来
  console.log(state, action);
  return state;
}
```

根据下图可以发现，store 自动将当前的 state 和 value 传递给了 reducer。 

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/store自动传递state和action给reducer.png)

现在 reducer 既然已经能够接收到 state 和 action，那么就可以在 reducer 中进行一定的逻辑处理后再向 store 返回新的 state。

```js
export default (state = defaultState, action) => {
  if (action.type === 'change_input_value') {
    // 将原来的 state 进行一次深拷贝
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  return state;
}
```

现在 store 中的数据已经发生了变化，根据 Redux 的流程图，组件现在需要更新 state，store 提供了一个 subscribe 方法，该方法的参数是一个回调函数，当 store 中的 state 发生变化时，就会调用该回调函数，那么只要在回调函数中改变组件的 state 就可以了。

```js
store.subscribe(this.handleStoreChange);
handleStoreChange() {
  this.setState(() => store.getState());
}
```

> 注意在改变 state 时，一定不能用 this.state = store.getState()的形式，只有在 constructor 方法中对组件的 state 进行初始化时才可以使用 this.state = store.getState() 的形式。

### 5.6 使用 Redux 完成 TodoList 的删除功能

完成删除功能给每一项绑定一个 onClick 事件，由于是使用 Ant Designe 的 List 组件去做的，所以要想获取每一项的 index 值，需要在绑定 this 时传入 index.

```jsx
<List
  renderItem={(item, index) => (
    <List.Item onClick={TodoList.handleDelete.bind(this, index)}>
      {item}
    </List.Item>
  )}
/>
```

在 handleDelete 函数中派发一个 delete 类型的 action。

```js
static handleDelete(index) {
    const action = {
      type: 'delete_item',
      index: index
    }
    store.dispatch(action);
}
```

在 reducer 中删除掉相应索引的项即可。

```js
if (action.type === 'delete_item') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
}
```

### 5.7 ActionTypes 的拆分

有的时候 action 的 type 很容易拼写错，而且还不容易发现，如果我们将 action 的 type 放到一个文件中统一管理，将 action 的 type 定义为常量，这样当拼写错误的时候会报告这个常量没有定义，而且在编辑器中拼写时还会有提示。

在 store 中新建一个 actionTypes 文件

```js
export const CHANGE_INPUT_VALUE = 'change_input_value';
export const ADD_TODO_ITEM = 'add_todo_item';
export const DELETE_TODO_ITEM = 'delete_todo_item';
```

然后在需要 action type 的文件中将需要的类型引入进去，直接使用这些变量即可。

### 5.8 使用 actionCreator 统一创建 action

在上面，action 的创建都是直接在方法中，这样当 action 比较多时不易于管理，而且不利于代码的复用。所以，我们一般会将 action  的创建放到 actionCreator 这个文件中，文件的内容由许多创建 action 的函数组成，某个组件想要创建某个 action 只需要将 actionCreator 这个文件引入并且并且调用执行相应的函数即可。

actionCreator 文件

```js
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './actionTypes';

export const changeInputValueAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const addTodoItemAction = () => ({
  type: ADD_TODO_ITEM
});

export const deleteTodoItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
});
```

### 5.9 redux 知识点复习补充

**redux 使用和设计的原则**

1）store 是唯一的

2）只有 store 能够改变自己的内容

我们可能会认为是 reducer 改变了 store 中的内容，实际上不是的，是 reducer 返回了新的 state，store 在拿到新的 state 之后自己去改变自己的 state。

3）Reducer 必须是纯函数

纯函数指的是给定固定的输入就会有固定的输出，而且不会有任何副作用。

例如给定固定的输入1，永远只会输出 2。如果函数的返回值是 new Date()，那么即使输入固定，输出也不会固定。

副作用 Dell 老师在这里的解释是函数输入的参数 state 和 action 不能被改变，在之前运算符这一节总结的是前后表达式之间会相互影响。总之就是不应该被改变的被改变了，和我们预期的不同。

**redux核心 API**

- createStore
- store.dispatch
- store.getState
- store.subscribe

## 6. Redux 进阶

### 6.1 UI 组件和容器组件

UI 组件有时候也被称为傻瓜组件，容器组件有时也被称为聪明组件。

UI 组件负责页面的渲染，容器组件负责页面的逻辑。

UI组件中只有一个 render 函数，因为它只负责页面的渲染，没有什么逻辑。

TodoList 组件中 render 函数内部是负责渲染页面的，可以将 return 内部的内容单独分离出来写成一个 UI 组件，UI 组件中需要的数据可以通过属性的方式由父组件传递。这样 UI 组件和容器组件就分离了，各司其职。

TodoList 中这样使用新创建的 UI 组件，UI 组件中需要的数据都从父组件中以属性的方式传递过去。

```js
render() {
    return (
      <TodoListUI 
        inputValue={this.state.inputValue}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        list={this.state.list}
        handleDelete={this.handleDelete}
      />
  )
}
```

### 6.2 无状态组件

当一个组件中只有一个 render 函数时，就可以使用无状态组件来定义这个组件。无状态组件就是一个函数，因为 UI 组件实际上就是 return 一段 JSX，而一个函数也可以返回一段 JSX，所以 UI 组件也可以利用无状态组件来定义。

还有一种方式来理解无状态组件，UI 组件中并不会涉及到逻辑，因此也不会涉及到状态的变化，即使用到了数据也是从父组件中传递过来的，因此不涉及状态变化的就是无状态组件。

将 UI 组件变为无状态组件

```js
const TodoListUI = (props) => {
  return (
  	JSX 代码
  )
}

export default TodoListUI;
```

无状态组件的性能比较高，因为它就是一个函数，而 UI 组件是一个类，还要执行许多生命周期函数。

### 6.3 Redux 中发送异步请求获取数据

发送 Ajax 放在 componentDidMount 中，代码如下

```js
componentDidMount() {
  axios.get('list.json').then((res) => {
    const data = res.data;
    const action = initListAction(data);
    store.dispatch(action);
  })
}
```

### 6.4 使用 Redux-thunk 中间件进行 Ajax 请求发送

> 注意中间件是 redux 的，不是 react 的，applyMiddleware 是从 redux 中导出的。

像 Ajax 这样的异步请求或者是一些特别复杂的逻辑如果全都放在组件中，组件就会显得比较臃肿，所以一般将它们放在其它的地方进行统一的管理。那么移动到哪里呢？[Redux-thunk](https://github.com/reduxjs/redux-thunk) 中间件可以将它们移到 action 中。

首先安装 [redux-thunk](https://github.com/reduxjs/redux-thunk)

```bash
npm install redux-thunk
```

要想使用 redux-thunk 中间件，需要在 redux 中引入 applyMiddleware 这个组件，使得我们可以使用中间件。

```js
import { createStore, applyMiddleware } from 'redux';
```

然后需要引入 thunk

```js
import thunk from 'redux-thunk';
```

我们知道 store 要使用 reducer 来进行逻辑处理，因此在创建 store 时要将 reducer 作为参数，同理，要在 store 中使用 redux-thunk，那么也需要用 applyMiddleware(redux-thunk) 作为参数。store 要使用什么就需要和它建立联系，创建 store 时传入的参数就表示建立起了联系，这是个人理解，不可能人为地想它们建立起联系了它们就建立起联系了。同理要用 Redux_Dev_Tools 来查看 store 中的内容，也要在创建 store 时建立起联系。

```js
const store = createStore(reducer, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

实际上，Redux_Dev_Tools 也是 redux 的一个中间件，如何同时用两个中间呢？根据 Redux_Dev_Tools 官网，可以写成下面的形式。

```js
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(
  reducer,
  enhancer
);

export default store;
```

之前的时候 actionCreators 中每个函数都是返回一个对象，使用了中间件之后，action 就可以是一个函数了，所以 actionCreators 中每个函数可以返回一个函数了，在这个函数中就可以发起 Ajax 请求或一些复杂的逻辑。获取到数据之后按照正常流程创建 action，然后派发 action。

```js
// actionCreators.js
export const getTodoList = () => {
	return (dispatch) => {
		axios.get('list.json').then((res) => {
      const data = res.data;
      const action = initListAction(data);
      dispatch(action);
    })
	}
}
```

有一点需要说明的是返回的函数会自动接收到一个 store.dispatch，根据下面的代码来说明，action 是一个函数，在执行 store.dispatch(action) 时，store 发现 action 是一个函数而不是一个对象，会自动执行 action 这个函数，并且会将 store.dispatch 传递给 action。

```js
// TodoList.js
componentDidMount() {
  const action = getTodoList();
  store.dispatch(action);
}
```

简单总结一下 redux-thunk 中间件

因为使用了中间件之后，dispatch 方法的参数不仅可以是一个对象也可以是一个函数，所以可以将异步请求或者逻辑比较复杂的代码放到这个函数中。为了描述比较清楚举例来说明，假设现在有一个组件 A 需要发送一个 Ajax 请求，我们有一个专门用来创建 action 的文件，里面有一个方法B，它会返回一个函数，我们可以将发送 Ajax 请求的代码放到返回的这个函数中。在组件 A 中调用返回一个函数的方法 B，并将方法 B 返回的函数赋值给一个 action，在组件 A 中接着执行 store .dispatch 方法将这个函数派发出去，但是由于是一个函数，这个函数会被执行，并且会将 store.dispatch 方法作为参数传递过去。在方法 B 中返回的那个函数中会接收到 store.dispatch 这个方法，然后在返回的函数中创建一个 action，再利用接收到的这个 方法派发出去即可。

### 6.5 到底什么是 Redux 中间件？

Redux 数据流程图

![Redux中间件](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Redux中间件.png)

根据上图可以看出来 Redux 中间件处于 action 和 store 中间，它的作用实际上是升级了 dispatch 方法，之前 dispatch 方法的能接收的 action 只能是一个对象，当使用中间件之后接收的 action 也可以是一个函数。使用中间件之后，当 dispatch 的参数是一个对象的时候就直接派发给 store，当参数是一个函数的时候，就执行这个函数并且将 store.dispatch 方法作为参数传递过去。

> 注意上面的理解都是基于 Redux-Thunk 来理解的，在 Redux-Saga 中异步请求并不是放在 action 中。

### 6.6 Redux-Saga 中间件的使用

首先安装 redux-saga， `npm intall redux-saga --save`

然后建立和 store 的联系，相当于告诉 store 现在在使用 redux-saga。

```js
import createSagaMiddleware from 'redux-saga';
import todoSaga from './todoSaga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
   applyMiddleware(sagaMiddleware),
);
const store = createStore(
  reducer,
  enhancer
);
sagaMiddleware.run(todoSaga);
```

异步操作和复杂的逻辑操作都在 todosaga 文件中。

在 TodoList 组件中创建 action(对象)，并且 `store.dispatch(action)`. 使用 redux-saga 之后，执行这条语句后会自动调用 todoSaga 函数(`sagaMiddleware.run(todosaga)`)。

todosaga 文件内容如下：

```js
import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes';
import { initListAction } from './actionCreator';
import axios from 'axios';

function* getInitList() {
	try {
		const res = yield axios.get('list.json');
		const action = initListAction(res.data);
		yield put(action);
	}catch(e) {
		console.log('list.json 网络请求失败');
	}
}

// generator 函数
function* todoSaga() {
	yield takeEvery(GET_INIT_LIST, getInitList)
}

export default todoSaga;
```

takeEvery方法会根据 action 的类型来判断是不是执行后面的方法，在此例中如果 action 的类型是 `GET_INIT_LIST`，那么就会调用执行 getInitList 方法。getInitList 方法也可以不是 Generator 函数，但是建议写成 Generator 函数。getInitList 方法中再创建 action，派发 action 即可。

### 6.7 React-Redux 的使用

React-Redux 是一个第三方的模块，可以帮助我们在 React 中更加方便地使用 Redux。实际上，使用 react-redux 之后可以使得定义在this.props 上的属性能够访问 store 中 state 的数据，this.props 上的方法能够调用 store 的 dispatch 方法。

那么怎样去实现这一点呢？

首先安装 react-redux，`npm install react-redux --save`.

既然使得组件有能力获取到 store 中的数据，那么说明 store 传递进了这个组件。在 react-redux 中使用 Provider 组件来实现使得组件能够直接访问 store。

```js
import { Provider } from 'react-redux';

const App = (
  // Provider 包裹的组件都有能力获取到 store 中的数据
	<Provider store={store}>
		<TodoListAntd />
	</Provider>
)

ReactDOM.render(App, document.getElementById('root'));
```

现在通过 Provider 使得被包裹的组件已经有能力获取到 store 中的数据，但是还不知道具体应该怎样获取。在组件中通过引入 react-redux 提供的 connect 将 store 和组件联系在一起，并且通过 `mapStateToProps` 可以将 store 中的 state 数据映射到 this.props 上，也就是在 this.props 上定义的属性可以获取到 store 中 state 上的数据。通过 `mapDispatchToProps` 可以使得定义在 this.props 上的方法能够调用 store 上的 dispatch 方法。

```js
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		inputValue: state.inputValue,
		list: state.list
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange(e) {
			const action = {
				type: CHANGE_INPUT_VALUE,
				inputValue: e.target.value
			}
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListAntd);
```

在上面的两个方法中都会返回一个对象，其实这个对象就是 this.props，`mapStateToProps` 中返回的对象上定义的属性能够获得 store 中 state 的数据，`mapDispatchToProps` 中返回的对象定义的方法内部能够调用 store 上的 dispatch 方法。

TodoListAntd 实际上是一个 UI 组件，逻辑部分在 `mapStateToProps` 和 `mapDispatchToProps` 中，connect 方法实际上将两者进行了结合，返回的结果是一个容器组件，使用 react-redux 之后一般都会拆分成这两部分。

注意 UI 组件可以写成无状态组件，也就是一个函数，参数是 props。

```js
const TodoList = (props) => {
  const { ... } = props;
  return (
  	...
  )
}
```

这里需要注意的一点是如果 TodoList 中需要很多方法，那么就需要在 TodoList 外部写很多函数，然后在 TodoList 组件中调用这些函数，这个时候外部的函数就会非常多。这时候也可以考虑将这些函数写在 TodoList 中将其再变回容器组件。

使用 react-redux 之后确实会简单很多，例如检测 store 变化的 `store.subscribe` 方法就不需要了，因为现在 store 中 state 的数据都映射到 this.props 上了。组件中也不需要再使用 this.state 了，直接使用 this.props 就好了。

## 7 项目实战：Header组件开发

### 7.1 7-01项目目录搭建，Styled-Components与Reset.css的结合使用

使用 `create-react-app` 创建项目。

styled-components 是有样式的组件，例如将一个 input 标签写上一些样式。

```js
export const Input = styled.input`
	color: red;
`; 

```

注意 Input 只是一个带了样式的 input 元素而已，它本质上还是一个 input 元素，它是一个单标签，在使用的时候不能将它当做双标签使用，例如下面这样。

```js
<Input>
  hello
</Input>

```

如果这样做了，浏览器中会报出以下错误：

```js
Error: input is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.

```

这样写 `<Input></Input>` 不会报错，但是不推荐这样写，中间又不能写内容，也没有必要这样写。

**为什么要使用 styled-components？**

> 关于 styled-components 的详细介绍可参考 [聊一聊React中的CSS样式方案]( https://www.cnblogs.com/zhangguicheng/p/12550291.html 

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import App1 from './App1';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <App1 />
  </React.StrictMode>,
  document.getElementById('root')
);


```

上面的代码引入的 index.css 是出现在 head 标签下的 style 标签下，因此任何在 index.js 中使用的组件都可以使用 index.css 中的样式。

![1584845869211](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/style.png)

很明显这样不利于样式的管理，每个组件不能有单独的样式，例如想让组件 App 的背景颜色为白色，index.css 中正好是这样设置的，但是 App1 中的背景颜色也会变成白色，这显然不是我们想要的。

关于 [styled-components](https://github.com/styled-components/styled-components) 见名知义就是带样式的组件。

将一个常用的标签加上样式做成一个组件然后export，在需要的文件中直接使用这个组件。

```js
style.js 文件
// HeaderWrapper 就是一个带样式的div标签
export const HeaderWrapper = styled.div` 
  position: relative;
  height: 58px; 
  border-bottom: 1px solid #f0f0f0;
`;

```

在另一个文件中：

```js
index.js 文件
// 使用HeaderWrapper这个组件
import HeaderWrapper from './style';

class Header extends Component {
    render() {
        return (
        	<HeaderWrapper />
        )
    } 
}

```

**如何在 style.js 中写全局样式**

可以利用 styled-components 中的 `injectGlobal`，下面代码设置了 body 的全局样式。（这种方法已废除）

```js
// style.js
import { injectGlobal } from 'styled-components';

injectGlobal`
	body {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}
`

```

现在需要引入新的 API `createGlobalStyle`，然后创建一个变量将全局样式包裹在其中。

```js
// style.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		font-family: sans-serif;
		background: blue;
	}
`

```

然后在组件中引入 `GlobalStyle` 组件放在 render() 中最外层元素的下面。

```js
import { GlobalStyle } from './style';

class App extends Component {
	render() {
		return (
			<div>
				<GlobalStyle />
			</div>
		) 
	}
}

```

**使用 reset.css**

由于每个浏览器对有些标签样式的实现并不一致，比如 `body`， `div` 等(margin, padding就有可能不同)，使用 `reset.css` 修改各个浏览器标签样式的默认值，做到所有的浏览器都保持一致。

将[reset.css官网]( https://meyerweb.com/eric/tools/css/reset/ )上面的代码复制到 style.js 中的 `createGlobalStyle` 后面设置全局的 reset 样式。

### 7.2 使用styled-components完成Header组件布局（1）

由于 Header 组件在许多页面都需要用到，因此创建一个 common 文件夹在此文件夹下再创建一个 header 文件夹来写 Header 组件。

错误写法：

```javascript
// Logo 就是一个带样式的a标签
export const Logo = styled.a` 
  background: url('../../statics/logo.png');
`;

```

因为 `webpack` 打包时，会将 `'../../'` 当做普通的字符串来处理，并不会将其当做路径。

正确写法：

```javascript
import logoPic form '../../statics/logo.png'

// Logo 就是一个带样式的a标签
// 在ES6模板字符串中嵌入变量使用 ${变量名}
export const Logo = styled.a`   
  background: url(${logoPic}); 
`;

```

 **styled-components 中`a` 标签属性 href 两种写法**

写法一：

```javascript
// index.js 文件
 <Logo href={'https://www.baidu.com'} />

```

写法二：

```js
// style.js 文件
// Logo 就是一个带样式的a标签
export const Logo = styled.a.attrs({
  href: 'https://www.baidu.com'
})`
	样式代码
`

```

在 styled-components 中给某个标签设置属性使用 `attrs`。

```js
export const NavSearch = styled.input.attrs({
  palceholder: '搜索'
})`
	样式代码
`

```

相同的组件不同的类名下单独设置样式的方式。

例如

```js
<NavItem class='left'></NavItem>
<NavItem class='right'></NavItem>

```

给 class 不同的 NavItem 组件单独设置样式

```js
export const NavItem = styled.div`
	// 公共属性
	line-height: 56px;
	color: red;
	// 单独给类名为left设置样式
	&.left {
		float: left;
	}
	&.right {
		float: right;
	}
`

```

**antd 库和 styled-components 结合使用**

在搜索框中用到 input 输入框时，用到了 antd 库中的 Input组件，在styled-components 中写样式时，styled 后面要用`(Input)`，如果是 html 中原有的标签后面要用 `.input`。如果是引进来的组件 styled 后面就要用 `()`。

**使用 iconfont**

iconfont 是一种静态资源，全部的组件应该都可以调用它，在阿里图标库下载完图标后，里面的 `iconfont.ttf,iconfont.woff,iconfont.svg,iconfont.eot,iconfont.css`  这五个文件复制到 src/static/iconfont 目录下。

下面修改 `inconfont.css` 文件中 url 的路径，在前面加上一个当前目录 `./`。（在引入文件的时候尽管是当前目录如果不写 `./`，有的时候会引入失败，所以以后尽管是当前目录下一律也要加上 `./`）

```js
src: url('./iconfont.eot?t=1585101355797'); /* IE9 */
src: url('./iconfont.eot?t=1585101355797#iefix') format('embedded-opentype'), /* IE6-IE8 */
url('./iconfont.woff?t=1585101355797') format('woff'),
url('./iconfont.ttf?t=1585101355797') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
url('./iconfont.svg?t=1585101355797#iconfont') format('svg'); /* iOS 4.1- */

```

字体图标应该作为一种全局样式，所以在用 styled-components 的情况下，要将 iconfont.css 命名为 iconfont.js，然后再按照 styled-components 中设置全局样式的方法将其设置为全局样式。

将 iconfont.js 中的样式导出到 GlobalIconfontStyle 中，然后再在 App.js 中引入。当然也可以将 iconfont.js 中的样式复制到 src 目录下的 style.js 中，但是这样的话上面的路径就不能是当前目录了。

然后利用 `<i className='iconfont'>Unicode编码</i>` 引入图标即可。

### 7.3 `react-transition-group` 实现动画效果

现在我们要给搜索框加一个动画，当鼠标点上去时搜索框会变长。可以 Header 组件 state 中设置一个 focused，当默认值是 false，当鼠标点上时，值变为 true，然后给 NavSearch 组件加上下面代码。

```js
<NavSearch className={this.state.focused ? 'foucsed' : ''}/>

```

当 this.state.focused 为 true 时给 NavSearch 组件加上一个 focused 类，并且在这个类中设置搜索框的宽度变大。并且在 focused 为 true 时 iconfont 的图标上加一个背景。可以这样设置 SearchWrapper 中的 i 元素。

```js
<i className={this.state.focused ? 'iconfont foucsed' : 'iconfont'}>&#xe90b;</i>

```

这样设置后再将 iconfont 中的 focused 类中设置加上背景的样式。然后通过 onFocus 事件来控制 this.state.focused 的值即可。

**搜索框动画效果的实现**

接下来将搜索框变长和缩短的过程使用 react-transition-group 加上动画效果。

```js
import { CSSTransition } from 'react-transition-group

```

要在哪里实现动画效果只需要用 `CSSTransition` 组件包裹起来即可。

在搜索框中实现动画效果：

```js
<CSSTransition  
in={this.state.focused}
timeout={300}
classNames='slide'
>
  <NavSearch 
		className={this.state.focused ? 'focused' : ''}
		onFocus={this.handleInputFocus}
		onBlur={this.handleInputBlur}
/>
</CSSTransition>


```

> **一定要注意在 CSSTransition 中设置的是 classNames，而不是 className**。

当在 CSSTransition 中设置 classNames 为 slide 之后，实际上是在NavSearch 组件上在不同的时刻设置不同的类，总计设置了 6 个类。

```js
/*入场动画执行的第一个时刻的样式*/
&.slide-enter {
  transition: all 0.2s ease-out; 
}
/*入场动画执行的第二个时刻到入场动画执行完成前的时间内的动画样式*/
&.slide-enter-active {
  width: 200px; 
}
/*入场动画执行完成之后的样式*/
&.slide-enter-done {
  width: 200px;
}

/*出场动画执行的第一个时刻的样式*/
&.slide-exit {
  transition: all 0.2s ease-in; 
}
/*出场动画执行的第二个时刻到出场动画执行完成前的时间内的动画样式*/
&.slide-exit-active {
  width: 160px;
}
/*出场动画执行完成之后的样式*/
&.slide-exit-done {
  width: 160px;
}

```

注意 CSSTransition 不能同时包裹两个子节点，像下面这样是错误的。

```js
<CSSTransition>
  <div><div>
  <span></span>
</CSSTransition>

```

像下面这样写是正确的，但是一般不这样写，一般只用它来包裹一个组件。

```js
<CSSTransition>
  <div>
  	<div></div>
  	<span></span>
  <div>
</CSSTransition>

```

在写 `styled-components` 样式文件时，& 表示的当前组件的属性，例如

```js
<Header
  className='left';
>    
  <Nav
		className='nav';
  >
  </Nav>
</Header>

```

在style.js中想要写 left 和 nav 类的样式，应该这样写。

```js
const export Header = styled.div`
  &.left {
    float: left;
}
  .nav {
	height: 60px;
}
`;

```

注意这两种写法的不同，对于组件自身的类用 `&.` 对于子组件的类直接用 `.` 。

> 关于 styled-components 的基本用法参考 [ [styled-components的基本使用指南](https://www.cnblogs.com/zhangguicheng/articles/12569368.html) ](https://www.cnblogs.com/zhangguicheng/articles/12569368.html)

### 7.4 使用 `React-Redux` 进行应用数据的管理

首先安装 `React` 和 `React-Redux`

```js
yarn add redux
yarn add react-redux

```

主要想说两点：

1）使用 react-redux 之后组件的 state 中就不存数据了，数据都存到 store 中了，组件通过 this.props 获取 store 中的数据，props 中的数据发生变化，组件就会重新渲染。组件本身的 state 好像就没有作用了。在不使用 react-redux 的时候，还需要它来接收 store 中的数据，当 store 中的数据发生变化时会调用 setState 来将 store 中的数据赋值给组件的 state，但是在使用 react-redux 之后组件自身的 state 似乎就用不上了，这是我暂时的理解。

2）在以前不用 redux 的时候，绑定的事件函数都是需要 bind(this) 的，这是因为当子组件需要向父组件传递值时，子组件需要调用父组件的方法，所以要保证传递过来的方法的执行环境是父组件对应的变量对象，所以要要在父组件中绑定this后再传递过来。当然可能还有其它的情况需要绑定 this，我暂时没想到。但是在使用 redux 之后数据都是存放在 store 中的，不需要在组件之间传递方法，所以也就没必要绑定 this 了。使用 react-redux 之后数据还是存放在 store 中，组件中使用的数据和方法都是定义在 props 上的，所以也没必要绑定this.props.其实需不需要绑定 this 根据实际情况就能看出来，你需要这个方法运行在哪个运行环境，它实际在哪个运行环境，它实际运行在哪个运行环境可以通过 console.log(this) 得到。

### 7.5 使用 combineReducers 完成对数据的拆分管理

[redux开发调试工具]( https://github.com/zalmoxisus/redux-devtools-extension )，在谷歌应用商店搜索 `redux-devtools-extension` 安装即可。

之前创建store的方法：

```js
const store = createStore(reducer);

```

这样创建store是无法使用这个redux开发工具的。

在程序中使用的方法：

```js
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers());

```

这样写之后程序中就可以使用 `Redux` 开发工具了。

现在简单说一下**``reduer` 合并**：

```js
//////////////////////说明reducer合并的原理//////////////////////////
/*为了不使store中的reducer文件的代码太多，故分成许多reducer放在各个组件的store中，比如将header组件用到的reducer单独放在header组件的store中。然后将reducer进行合并后再将最终合并完成的reducer export出去。*/
const reducer = combineReducers({
  header: headerReducer
});

export default reducer;


```

`Reducers` 就相当于图书馆管理员手中的小册子，现在分成了好多小册子，想要取得某个小册子(`reducer`) 中的数据必须先进入这个小册子(`reducer`)，然后才能取到数据。

有一点需要注意，在其它文件中使用 `store` 中的数据时，并不直接是 `store.` 数据了，以取 header组件中的 `focused` 数据为例，现在应该写成 `store.header.focused` 而不是 `store.focused`。

```js
const mapStateToProps = (state) => {
  return {
    focused: state.header.focused,
  }
};


```

`redux` 调试工具截图：

![header组件下的focused数据.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/header组件下的focused数据.png)



现在有一点不明白：是不是 `dispatch(action)` 会将 `state` 和`action` 转发给 store 加载到所有的 `reducer` 中呢？

### 7.6 actionCreators 与 constants 的拆分

这一节主要记住：

- `store` 下的所有需要导出的内容都通过 `index.js` 这个文件来导出；

- `action` 的类型在 `actionTypes.js `  文件中统一定义；

- 创建 `action` 的方法在 `actionCreators` 中统一定义。

- 使用下面这种形式导出数据

  ```js
  // header/store/index.js
  import reducer from './reducer';
  import * as actionTypes from './actionTypes';
  import * as actionCreators from './actionCreators';
  
  export { reducer, actionTypes, actionCreators };
  
  ```

- 使用下面这种形式引入数据(`ES6` 中的解构赋值)

  ```js
  // header/index.js
  import { actionCreators } from './store';
  
  ```

使用这样的文件结构之后，header 组件各个文件的分工就非常明确了。

### 7.7 使用 `immutable-js` 来管理 `store` 中的数据

> 官网的名称是 immutable-js 而不是 immutable.js
>
> 将 immutable 对象转换为 JS 对象，immutableList.toJS();
>
> 将 JS 对象转换为 immutable 对象，fromJS(jsList);
>
> 注意使用 set，setIn，merge 方法并没有改变 state，return 出去的是 const res = state.set('focuse', true); return res; 并不是 return state。

`immutable-js` 是 `facebook` 团队历时三年开发的库。

安装 immutable 库，`npm install immutable --save`

我们知道在 `reducer` 中是不允许修改 `store` 中传入的 `state` 值的，但是在开发过程中有时一不注意就会修改了，`immutable.js` 可以解决这样的一个问题。因为使用 immutable 之后根本接触不到 `state.属性` 的形式，所以也就确保了不会改变 state，使用 immutable 之后不用对原来的 state 进行一次深拷贝，return 出去的是 `state.set` 的结果，注意并不是 return state。 

> reducer函数必须没有副作用，体现在两个方面，一是固定的输入必须有固定的输出，二是对传入的参数只可以使用不能修改，immutable.js 解决的就是第二个问题。

它可以帮助我们生成一个 `immutable` 对象，这个对象是不可改变的。

```js
import { fromJS } from './immutable';

// 将一个JS对象转换为immutable对象
const defaultState = fromJS({
  focused: 'false'
});

```

想要获得 `immutable` 对象的属性不能使用 `.` 运算符，要使用 `get` 方法。

`immutable对象.get('属性名')`

`immutable` 对象的 `set`方法，会结合之前 `immutable` 对象的值和现在要设置的值，返回一个全新的`immutable` 对象，并没有改变原始的 `immutable` 对象。

```js
export default (state=defaultState, action) => {
  if (action.type === actionTypes.SEARCH_FOCUS) {
    // immutable 对象的set方法，会结合之前immutable对象的值和现在要设置的值
    // 返回一个全新的immutable对象，并没有改变原始的immutable对象。
    return state.set('focused', true);
  }
  if (action.type === constants.SEARCH_BLUR) {
    return state.set('focused', false);
  }
  return state;
};


```

下面的代码中不明白为什么 `state` 是 `JS` 对象，`state.header` 是一个 `immutable` 对象？

（因为是在 header 下的 reducer 中返回的 state 是一个 immutable 对象，所以 state.header 是一个 immutable 对象。）

```js
const mapStateToProps = (state) => {
  return {
  // 使用immutable之后，现在的state是JS对象，state.header是一个immutable对象，访问			   state.header上面的属性不能再使用.运算符了，需要使用get方法。
    focused: state.header.get('focused') // 普通对象是没有get方法的
  }
};

```

我理解了一些，现在解释一下：

`header` 是由 `header/store/reducer.js` 中的下面这段代码生成的，很明显它是一个 `immutable` 对象。

```js
// src/common/header/store/reducer.js
const defaultState = fromJS({ // fromJS(JS对象)将一个JS对象转换为immutable对象
  focused: false
});

```

`state` 是由 `src/store/reducer.js` 中的下面这段代码生成的，很明显它是一个 `JS` 对象。

```js
// src/store/reducer.js
const reducer = combineReducers({
  header: headerReducer
});

export default reducer; // 这里返回的reducer就是那张redux流程图中的newState


```

这里返回的reducer就是上面那张 `redux` 流程图中的 `newState`，它有一个 `header` 属性，很明显从代码中 `reducer`  常量的创建上来看它就是一个普通的 `JS` 对象，不要换个名称就不认识了，要从原理出发去思考。

其实，查了一下官方文档，`mapStateToProps` 方法中的参数 `state` 是 `store` 的 `state` , `store` 中的 `state` 实际上是由 `reducer` 的返回值决定的。 `store` 在收到 `reducer` 的返回值之后，会自动更新自己的 `state` 值。注意再强调一遍，是 `store` 自己更新自己的 `state` 值，`reducer` 是没有权利去更改 `store` 中的 `state` 值的，它只是向 `store` 中提供 `state` 值，更新是 `store` 自己的事。

### 7.8 使用 `redux-immutable`  来统一数据格式

[redux-immutable官网]( https://github.com/gajus/redux-immutable )

**为什么需要 redux-immutable？**

解决 `7.7` 节最后提到的 `state` 是 `JS` 对象，`header` 是一个 `immutable` 对象，这样的话在需要使用 `state.header.get('focused')` 这样的形式去获取 focused 属性的值，可以发现由于 state 是一个 JS 对象，所以需要使用点的方式获取属性，由于 `state.header` 是一个 immutable 对象，所以需要使用 get 方法获取属性。这样是不统一的，容易出错，redux-immutable 要做的就是统一数据格式。

**使用方法**

redux-immutable 中有一个方法是 combineReduces，它也可以结合多个 reducer 成为一个大的 reducer。之前 combineReducers 方法是从 redux 中引入的，最终生成返回的 state 的是一个 JS 对象。现在利用 redux-immutable 中的 combineReducers 方法，最终会生成返回一个 immutable 对象。

```js
import { combineReducers } from 'redux-immutable';

const reducer = combineReducers({
  header: headerReducer
});

export default reducer; 

```

这时候在取值时，就要这样写了：

```js
state.get('header').get('focused')
 
// immutable对象中的getIn方法表示从state这个immutable对象中的header中取focused属性的值
state.getIn(['header', 'focused']) 

```

### 7.9 `Ajax` 获取推荐数据

在 `React` 中使用 `Ajax` 需要使用 `axios` 这个第三方的库。

```js
// 需要使用 Ajax 的js文件
import axios from 'axios';

```

`Ajax` 请求的异步操作在用 `Redux-thunk` 中间件时是放在创建`action` 函数中的。

> 具体理解见ipad： React制作简书(慕课)笔记

**redux-thunk 使用流程：**

1）在创建 store 的文件中引入。

```js
// src/store/index.js
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk))); // 使用 thunk 中间件

export default store;


```

2）在创建 action 的函数中编写异步代码，创建一个新的action并且dispatch出去。

```js
// src/common/header/store/actionCreators.js
// api/headerList.json 中的内容为
// 
{
    "success": true,
    "data": ["高考", "区块链", "三生三世", "崔永元", "vue", "小程序", "react", "app"]
}
// 利用 Ajax 请求获取搜索框中的推荐内容
export const getList = () => {
  return (dispatch) => { //注意这个地方有一个dispatch参数
    axios.get('/api/headerList.json').then((res) => {
	  const data = res.data;
      const action = {  // 新建一个action
        type: 'change_list',
        data: data.data;  
      };
      dispatch(action); // 将新创建的action传给store
    }).catch(() => {
      console.log('error');
    })
  }
};

```

学到一点新知识：平常老说接口接口，其实这个headererList.json文件就是一个接口在真正开发的过程中，这个时候就需要和后端的小伙伴进行沟通了，我需要从哪里取数据呢？经过一致商量之后，咱们就约定在 public 目录下api文件夹下的headerList.json吧。前端人员在开发时在 public/api 下新建一个 headerList.json 文件，在上线时使用后端提供的 headerList.json 文件，将自己的删掉。

> public 目录是对外公开的目录，在 npm start 之后访问 localhost：3000 时展示的页面就是 public 目录下的 index.html，前后端交互的接口也都保存在这个目录下。在前端是需要由 webpack 进行配置的，使用 create-react-app 创建的项目下已经自动配置好了。

我们通过 localhost:3000/api/headerList.json 可以访问到这个文件的内容，所以我们可以通过 axios 请求这个路径下的文件来模拟 ajax 请求。

在开发的时候除了需要和后端商量路径外还需要和后端商量返回文件的内容格式。例如上面请求的 headerList.json 文件，我们可以和后端做出以下约定，你需要返回一个对象，对象中有两个属性，success 表示请求是否成功，data 表示请求回来的数据。

```json
{
  "success": true,
  "data": ["慧思", "慧思", "慧思"]
}

```

3）在事件处理函数中使用dispatch方法。

```js
const mapDispatchToProps = (dispatch) => ({
  handleInputFocuse() {
    ...
    dispatch(actionCreators.getList());
    ...
}

```

`actionCreators.getList()` 会返回一个函数，调用了 `redux-thunk` 之后 `dispatch` 的参数也可以是函数了，它会自动调用执行这个函数并且会把dispatch方法作为参数传递给这个函数。

4）在 reducer 中做相应的逻辑处理

在 reducer 中 state 的初始值

```js
const defaultState = fromJS({
  focused: false,
  list: []
});

```

fromJs 也会将 list 数组变为一个 immutable 数组，所以在使用set对它进行修改时，一定要注意赋值给它的也必须是一个immutable数组。

就此节而言，通过 Ajax 获取到的搜索框中的推荐内容是一个普通的 JS 数组，需要将其转换为 immutable 数组之后才可以对初始值中的 list 进行改变。

```js
export const changeList = (list) => ({
  type: actionTypes.CHANGE_LIST,
  list: fromJS(list)
});

```

在 reducer.js 中对初始值中的 list 进行改变。

```js
  if (action.type === actionTypes.CHANGE_LIST) {
    return state.set('list', action.list);
  }

```

无论是 immutable 数组还是 JS 数组都可以使用 map 方法。

### 7.10 热门搜索换页功能实现

现在假设热门搜索一次只显示 4 条内容，点击换一批时换6个新的内容。其实我们在用 Ajax 请求过来的列表中内容有很多，只是一次让它只显示 4 条。所以我们可以将这些内容分页，一页只有 4 条内容，当点击换一批时就显示另一页的内容。

现在要在 store 中增加当前所在的页和总的页数，然后在获取到数据后，修改 store 的 totalPage 值。下面首先获取到当前页的需要展示的数据。

```js
for ( let i = (page - 1) * 4; i < 4 * page; i++) {
  pageList.push(
    <SearchItem key={i}>{jsList[i]}</SearchItem>
)

```

当前页需要展示的数据是获取到列表中第 `(page-1)*4` 项到第 (`page*4`) 项。然后再将 pageList 数组写在 JSX 中展示出来即可。

```js
<SearchInfo>
  <SearchHot>
    热门搜索
  <SearchChange onClick={handleChangeHot}>换一批</SearchChange>
  </SearchHot>
  {
    pageList
  }
  <SearchHistory>
    搜索历史
  </SearchHistory>
</SearchInfo>

```

注意，当把一个数组直接放在 JSX 代码中，react 会将数组的每一项渲染在页面上，例如

```js
render() {
  return (
  	{
      [1, 2]
    }
  )
}

```

在页面上会显示出 1 2，并不会报错，react 中中应该是用了 ES6 中新增的扩展运算符 `...[1, 2]`。但是当是一个对象时，并不会渲染出来而且还会报错。

现在还有一个问题就是，当我们点击换一批时，搜索框会失焦。所以需要借助 mouseIn 和 mouseOut 来判断当前鼠标是不是在搜索面板上。

```js
 if (focused || mouseIn)

```

获得焦点或者移入搜索框面板都显示搜索框面板。

在使用 immutable-js 后改变 state 的值一般使用 set 方法，当需要改变state 中的多个值时，可以使用 state.merge 方法。

```js
return state.merge({
  list: action.list,
  totalPage: action.totalPage
});

```

### 7.11 换页旋转动画效果的实现

> 注意 transform 只能对 block 元素生效，所以本例中需要将 i 元素变为 block 元素。

本节没有借助 css-transitiongrou 这样的动画库来实现字体图标的旋转，而是通过原生的方式来实现的。实现的思路，通过 ref 获取到 i 元素，然后设置 style.tansform 属性，每点击一次令其旋转的角度加 360 deg，使用到了正则表达式，字符串拼接等知识。

首先通过 ref 获取到 i 元素。

```js
<i ref={(icon) => {this.icon = icon}} className='iconfont'>&#xe61d;</i>

```

然后将其传入点击换一批绑定的事件处理函数 handleChangeHot 中。注意传入参数的方法，不能直接将参数传递给 handleChangeHot 中。

```js
<SearchChange onClick={() => {handleChangeHot(this.icon)}}>

```

在回调函数中实现每点击一次加 360 deg，从而实现每点击一次都旋转 360deg。

````js
let originAngle = icon.style.transform.replace(/[^0-9]/ig, '');
if (originAngle) {
  originAngle = parseInt(originAngle, 10);
} else {
  originAngle = 0;
}
icon.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

````

```js
// 回忆一下字符串拼接
let str = 35;
console.log('35 + '+ ( str + 5 ) + '=' + (35 + 35 +5)); // 35 + 40 = 75

```

### 7.11 避免无意义的请求发送，提升组件性能

我们会发现这样一个问题，每点击一次 input 输入框获得焦点后就会发送一次 Ajax 请求，这样无疑是没有必要的。我们可以通过将请求来的 list 作为参数传递给 handleInputFocus ，然后根据 list 的 size(注意此时的 list 并不是一个JS数组而是一个 immutable 数组不能上来就用 list.lenght)来判断是否需要发送 Ajax 请求。

```js
(list.size === 0 ) && dispatch(actionCreators.getList());

```

## 8. 项目实战：首页开发

### 8.1 什么是路由，如何在 `react` 中使用路由功能

路由就是根据 url 的不同显示不同的页面。访问首页的时候显示的是首页的内容，访问详情页的时候显示的是详情页的内容。

在react 要使用路由可以使用 react-router-dom 这个第三方模块。

安装 `react-router-dom` 。

```js
npm install 'react-router-dom' --save

```

在 App.js 中从 react-router-dom 中引入BrowserRouter 和 Route。

```js
import { BrowserRouter, Route } from 'react-router-dom';

<BrowserRouter>
  <div>
    <Route path='/' render={()=><div>home</div>}></Route>  
    <Route path='/detail' render={()=><div>detail</div>}></Route>  
  </div>
</BrowserRouter>

```

这个时候会发现一个问题，在访问 `localhost:3000/detail` 的时候 `localhost:3000` 的页面也会出来，这是因为满足 `/detail` 也包含 `/`。

 在 path 后面加上 `exact` 参数就可以了，表示必须精确匹配上才能显示对应的页面。

```js
<Route path='/' exact render={()=><div>home</div>}></Route>  
<Route path='/detail' exact render={()=><div>detail</div>}></Route>  

```

现在我们在 src 目录下新建一个 pages 文件夹，然后新建 Home 和 Detail 文件夹，分别在两个文件夹下新建 index.js，现在要求在访问根目录下显示 Home 组件，在访问 `./detail ` 时显示 Detail 组件。

```js
<Route path='/' exact component={Home}></Route>  
<Route path='/detail' exact component={Detail}></Route>  

```

### 8.2 首页组件的拆分

对于首页来说由于需要展示的内容太多，如果都写在 Home 这一个组件中那么这个文件会很大，当一个文件超过 300 行时就需要考虑是不是没有进行组件的拆分。

![1585362793008](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200328023532简书首页组件拆分.png) 

在这里将 Home 组件拆分为上面的四个小组件。

### 8.3 首页专题区域布局及reducer设计

上一节我们将 Home 组件分成了四个小组件，这一节写 Topic 这个小组件。像这种小组件一般内容比较少，没必要再重新建立一个文件夹新建一个 style.js 来单独写它的样式。我们可以在 Home 这个大组件的 style.js 下写这四个小组件的样式。

在本节 get 到一个写 css 的一个小细节，假设现在需要我们将一些方框排列到一行，这个时候两个方框中间的间隙一般需要用 margin-left 来做，但是有个问题是第一个小方框距离最左边也是有一个间距的。我们可以在其父盒子上写一个 `margin-left: -10px` ，然后在子盒子中再写 `margin-left` 之后最左边的盒子和左边就没有间隙了。

### 8.4 首页推荐部分代码编写

在这一节中用到了 style-components 中的变量，在调用 RecommendItem 组件时 imgUrl 的值传递过去，在写样式的时候接收。

```js
// Recommend.js
<RecommendItem imgUrl='https://...'></RecommendItem>

```

```js
// style.js
export const RecommendItem = styled.div`
	background: url(${(props)=>(props.imgUrl));
`;

```

### 8.5 首页异步数据获取

现在所有的数据都是用 defaultState，现在需要模拟从后端获取数据。这个时候需要和后端的小伙伴商量存在什么路径下，经过商量之后假设现在将首页的数据存放在 `/api/home.json` 文件中。

然后和后端商量数据的格式，经过商量之后得出以下的格式，在 success 中存放一个布尔值表明是否请求成功，data 中存放首页需要的数据。

```json
{
  "success": true,
  "data": {
    topicList: [{
      id: 1,
      title: '社会热点',
      imgUrl: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg'
    }, {
      id: 2,
      title: '社会热点',
      imgUrl: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg'
    }],
  articleList: [{
      id: 1,
      title: 'CSS中box-shaow详细用法教程',
      abstract: '摘要：影子在现实生活中可以是一个物体的副本，在 CSS 中也是这样的，相当于复制了那个元素（并不是真正的元素，对页面布局没有任何影响），可以从下面的代码中看出来。',
      content: '',
      imgUrl: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg'
    }, {
      id: 2,
      title: 'CSS中box-shaow详细用法教程',
      abstract: '摘要：影子在现实生活中可以是一个物体的副本，在 CSS 中也是这样的，相当于复制了那个元素（并不是真正的元素，对页面布局没有任何影响），可以从下面的代码中看出来。',
      content: '',
      imgUrl: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg'
    }, {
      id: 3,
      title: 'CSS中box-shaow详细用法教程',
      abstract: '摘要：影子在现实生活中可以是一个物体的副本，在 CSS 中也是这样的，相当于复制了那个元素（并不是真正的元素，对页面布局没有任何影响），可以从下面的代码中看出来。',
      content: '',
      imgUrl: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg'
    }]
  } 
}

```

### 8.6 实现加载更多功能

在 List 组件下新建一个 LoadMore，然后在上面绑定一个 click 事件，当点击 LoadMore 时就会去请求 homeList 文件（homeList 文件是更多的 articleList），这样就会实现加载更多的需求。

在请求到 articleList 的内容之后现在要做的不是直接替换原来的 state 中的 articleList 了而是在原来的基础上追加最新获得的 articleList。

```js
return state.set('articleList', state.get('articleList').concat(fromJS(action.articleList)));

```

> 除了 fromJS 能将 JS 数组转换为 immutable 数组，List 也能将 JS 数组转换为 immutable 数组。但是 List 只能将最外层的 JS 数组变为 immutable 数组，数组里面的 JS 数组是不会进行转换的，fromJS 哪一层的 JS 数组或对象都会被转换。

在真正的开发过程中是利用分页来加载下一页的内容，就像是最常见的点击下一页或某一页就会切换到某个具体的页。所以这个时候需要在 store 中加一个 articlePage 来记录当前在哪一页。

现在涉及到一个问题就是怎样告诉后端现在我现在需要的是哪一页，可以通过 Ajax 请求数据时在 url 中最后加一个参数。

```js
axios.get('/api/homelist.json?articlePage=' + articlePage).then(...)

```

### 8.7 返回顶部功能实现

`window.scrollTo(0, 0)` 可以使得页面返回顶部。现在有一个需求是当页面滚动距离顶部超出某个值时显示出返回顶部的按钮，所以需要绑定一个 scroll 事件获得当前滚动的距离。那么在哪里绑定这个事件呢？是在 BackTop 这个组件上吗？当然不是，这需要在 window 上绑定这个事件，当页面滚动时才能实时获得滚动的距离。那么既然是在 window 上绑定事件，那么绑定事件处理程序2应该写在哪里呢？肯定不像是其它的时候在一个组件内部通过 `onClick` 这种形式绑定了。

这个时候可以在 componentDidMount 中执行`this.bindEvents()` ，然后在 `bindEvents` 方法中定义需要绑定的事件。这种思路一定要清晰，不要只会用 `onClick` 这种形式绑定事件。

```js
componentDidMount() {
  this.props.changeHomeData();
  this.bindEvents();
}
bindEvents() {
  window.addEventListener('scroll', this.props.changeScrollTopShow, false);
}

```

通过 document.documentElement.scrollTop 可以实时地获取到距离顶部的距离，然后再通过和 400 进行比较来确定是显示回到顶部按钮还是不显示，进而修改 store 中的 showScroll 即可。

```js
const mapDispatchToProps = (dispatch) => ({
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 400) {
      dispatch(actionCreators.changeScrollShow(true));
    }else {
      dispatch(actionCreators.changeScrollShow(false));
    }
  } 
})

```

注意现在是在 window 上绑定的事件，所以在当前组件在页面上移除的时候 window 上的这个事件还是存在的，但是这个组件已经移除了根本用不到了，所以要在这个组件将要移除的时候移除 window 上的这个事件，可以在 `componentWillUnmount` 中移除这个事件。

```js
componentWillUnmount() {
  window.removeEventListener('scroll', this.props.changeScrollTopShow, false);
}

```

### 8.8 首页性能优化及路由跳转

现在我们写的每个组件都用了 connect 方法来获取 store 中的数据，无论是 store 中哪个数据发生变化了，这些组件无论用没用到这个数据都会被重新渲染。

解决这个问题的方法是利用 shouldComponentUpdate 方法，判断是不是当前组件中用到的 store 中的数据发生变化了，如果是才更新这个组件。但是这样写每个组件都要写一次很耗时费事，react 已经帮我们自动实现了这个功能，也就是利用 PureComponent 组件，我们只需要将之前 `extends component` 中的 `component` 换成 `PureComponent` 即可。  

**注意因为在此项目中我们使用了 immutable 可以保证 state 中的数据不会被人为地更改，如果不使用 immutable 那么使用 PureComponent 有可能会遇到坑。**

```js
import React, { PureComponent } from 'react';

class App extends PureComponent {
  ...
}

```

我们做的是一个单页面应用，所谓单页面应用指的是只会加载一次 html 文件，如果使用 a 标签跳转到一个新的页面此时又加载一个 html 文件那么这不叫单页面应用。在此项目中借助 react-router-dom 这个第三方模块就可以实现只加载一个 html 文件的前提下还能进行页面的跳转。

使用 react-router-dom 中的 Link 组件就可以实现页面的跳转。

```js
// 点击页面上的Logo就可以跳转到首页
<Link to='/'>
  <Logo />
</Link>

```

有一点需要注意的是要想利用 Link 组件进行页面跳转，组件必须包含在 BrowserRouter 组件中。

```js
<Header />
<BrowserRouter>
  <div>
  	<Route path='/' exact component={Home}></Route>  
		<Route path='/detail' exact component={Detail}></Route>  
	</div>
</BrowserRouter>

```

上面的代码中 Header 组件并没有包含在 BrowserRouter 中间，所以在 Header 组件中使用 Link 标签是没有作用的。

单页面应用由于无需再次加载html页面所以会瞬间变换过去，不会有什么等待，只是加载页面上的资源需要消耗时间。不是单页面应用的加载新的页面时会出现短暂的空白，因为需要将 html 文件请求过来然后再在页面上渲染，这段时间页面上是没有内容可以展示的。

## 9. 详情页面和登录功能开发

### 9.1 详情页面布局

如果想要在页面上显示的字符串中的 html 标签不被转义，可以在组件中使用 `dangerouslySetInnerHTML ={{__html: html}}`

```js
const html = '<h1>hello world</h1>';
render() {
  return (
  	<Content dangerouslySetInnerHTML={{__html: html}}></Content>
  )
}

```

但是如果直接这样写不怀好意者可以通过 script 标签注入恶意代码，这个时候我们可以通过 DOMPurify之类的工具对HTML字符串进行清理。 

```js
import DOMPurify from 'dompurify';

const html = '<h1>hello world</h1>';
render() {
  return (
  	<Content dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}}></Content>
  )
}

```

像这种工具有很多，可以参考 [插入带有React变量语句（JSX）的HTML](http://www.imooc.com/wenda/detail/592219)。

### 9.2 异步获取数据

详情页面上的数据需要从后端获取，所以在加载详情页面的时候需要向后端发送 Ajax 请求，可以在 componentDIdMount 中发送 Ajax 请求。注意在 componentDIdMount 中并不是真正写 Ajax 请求的代码，而只是要调用 getDetail 方法告知要发送 Ajax 请求了。

### 9.3 从页面上获取参数的两种方式

**方法一：动态路由获取参数**

现在我们无论点击哪一个文章，都会跳到 `localhost:3000/detail`，这是在 List.js 文件中的 Link 组件设置的。

```js
articleList.map((item, index) => (
	<Link key={index} to='/detail'>
    <ListItem>
        <img className='listImg' src={item.get('imgUrl')} alt='' />
        <ListInfo>
          <h3 className='listTitle'>{item.get('title')}</h3>
          <p className='listContent'>{item.get('abstract')}</p>
        </ListInfo>
      <ListFootnote>
        <div className='writer'>codingOrange</div>
        <div className='read'>阅读</div>
        <div className='comment'>评论</div>
      </ListFootnote>
    </ListItem>
  </Link>
))

```

显然这是不合理的，不同的文章应该有不同的 id，在 Ajax 获取的文件中每篇文章都有一个唯一的 id，在这里可以通过 item.get('id') 获得，并且可以将其传给 Link.

```js
<Link key={index} to={'/detail/'+ item.get('id')}>
  ...
</Link>

```

这个时候再点击首页中的第一篇文章发现访问的 url 变成了 `localhost:3000/detail/1`，但是发现详情页显示不出来了，这是因为 src 下 App.js 的设置。

```js
<div>
  <Route path='/' exact component={Home}></Route>  
	<Route path='/detail' exact component={Detail}></Route>  
</div>

```

这里设置的是精确路由，`/detail/1` 是不能匹配 `/detail` 的，所以我们将其改成下面这样。

```js
<div>
  <Route path='/' exact component={Home}></Route>  
	<Route path='/detail/:id' exact component={Detail}></Route>  
</div>

```

注意上面的 id 只是一个占位符换成任何合法的标识符都可以。这样当`/detail/7` 这种形式的 url 就都是可以访问到详情页的了。

现在我们访问详情页面的 url 是 `localhost:3000/detail/1`，那么如果我们在详情页可以获取到最后边的那个参数（也就是文章的 id），然后在发送 Ajax 请求时在请求的 url 中加上获得的参数，那么后端就可以知道现在前端需要获取的是那一篇文章了。

我们知道对于一个组件来说，props 是对外的接口，state 是内部的接口，外部与组件相关的数据发生变化在这个组件的 props 都会有体现。既然这里访问详情页面的 url 发生了变化，那么在 props 中应该会有变化，在详情页面的 render 中打印出 props 发现在 `match.params.id` 下有一个 id 值正好就是 url 中最后边的那个参数。

![props中获取url中最后边的参数.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/props中获取url中最后边的参数.png)



所以我们可以将 `this.props.match.params.id` 经过函数参数最终传递到发送的 Ajax 请求的 url 上。

```js
// id 就是 this.props.match.params.id
axios.get('/api/detail.json?id=' + id).then(...)

```

这样后端就可以知道我们要请求的是哪一篇文章了，后端的小伙伴将相应的文章发送给前端即可。

![后端从url中获取前端传递的参数](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/后端从url中获取前端传递的参数.png)

**方法二：? 参数的形式**

将 List.js 中的 link 组件改写成下面的形式

```js
<Link key={index} to={'/detail?id='+ item.get('id')}>
  ...
</Link>

```

> 注意在 url 中 ? 后面的是参数，不会涉及到 url 的匹配，例如 /detail?id=1 和 /detail 是能够匹配上的。

我们现在依然在 Detail 组件的 render 方法中打印一下 props，url 中的参数出现在 this.props.location.search 中。

![1585488651176](E:\FrontEndProject\huisiblog\doc\dev\1585488651176-1587121658549.png)

我们需要手动去解析 search 获取到里面的数字，然后再将其传递给发送 Ajax 请求时的 url 即可。

### 9.4 登录页面布局

> MDN: 大多数情况下，height和width 被设定为auto的绝对定位元素，按其内容大小调整尺寸。但是，被绝对定位的元素可以通过指定top和bottom ，保留height未指定（即auto），来填充可用的垂直空间。它们同样可以通过指定left 和 right并将width 指定为auto来填充可用的水平空间。

有学到一点关于 position 的应用，将 position 设为 absolute 后，在没有宽高设置的情况下可以设置 top 和 bottom 来使其填充垂直方向的空间，在设置 left 和 right 的情况下可以用来填充水平方向的空间。

在写登录页面时，上面是 Header 组件，下面是一个背景色，这个时候可以通过设置一个绝对定位元素使其填充 Header 下面的所有空间。

```js
export const LoginWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #eee;
`;

```

![使用绝对定位元素填充空间](E:\FrontEndProject\huisiblog\doc\dev\1585490155484-1587121658550.png)

### 9.6 登录功能实现

在 reducer 中存储一个数据 login，用来表示是否登录，如果用户登录了那么在 Header 组件上的登录二字变为退出，如果没有登录则显示登录。

现在我们给提交按钮绑定一个 click 事件，当点击提交时，需要获取到输入框中输入的内容传给后端，因此需要通过 ref 的方式获取到账户和密码这两个元素。但是由于现在使用的是 styled-components 组件，使用  ref 是获取不到输入框中的内容的，但是 styled-components 给我们提供了 innerRef 属性让我们可以获取到元素。其实 styled-components 中的 innerRef 就是不使用 styled-components 情况下的 ref。

> 注：Dell 老师讲的上面的内容可能是之前 styled-components 版本中的，现在亲测使用 ref 就可以获取到元素和输入框中的内容。

```js
<Input placeholder='账号' ref={(input) => {this.account=input}}/>
<Input placeholder='密码' type='password' ref={(input) => {this.password=input}}/>
< Button onClick={() => {this.props.login(this.account, this.password)}}>提交</Button>

```

当 login 为 false 时 Header 组件上应该显示登录，点击登录时应该跳到登录页面，实现代码如下。

```js
{ loginStatus ? '退出' : <Link to='/login'>登录</Link> }

```

点击登录跳到登录页面后，输入账号和密码点击提交，需要向后端发送一个 Ajax 请求，在请求的 url 最后携带账号名和密码。请求的 url 这个时候也是需要和后端商量我应该请求哪个 url，在后端接收到携带参数的 url 之后根据用户名和密码进行登录验证并且返回前端一个结果，返回的格式也需要和前端进行商量。在前端拿到验证结果后根据是否登录成功是将 login 的状态改为 true 并将登录改为退出，还是提示用户登录失败。

将登录框中的登录按钮绑定一个 click 事件，并将获取到的输入框中输入的用户名和密码作为参数传递过去。

```js
<Button onClick={() => {this.props.login(this.account, this.password)}}>提交</Button>

```

在 actionCreators 中发送 Ajax 请求，并且将 action 派发到 store。

```js
export const getDetailAction = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json?id=' + id).then((res) => {
      const result = res.data.data;
      dispatch(getDetail(result));
    }).catch(() => {
      console.log('detail.json请求失败')
    })
  } 
};

```

> 注意在 url 中传递参数的写法

在 reducer 中根据 action 修改 loginStatus 的状态。

```js
const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_LOGIN:
      return state.set('loginStatus', action.loginStatus);
    default: 
      return state;
  }
};

```

登录成功时需要将 Header  中的登录变为退出。

```js
// Header组件
{ loginStatus ? '退出' : <Link to='/login'>登录</Link> }

```

并且需要跳转到首页，页面的跳转可以用 react-router-dom 提供的 Redirect 组件。（Link组件需要点击包裹的组件才能跳转）在 Login 组件中根据 store 中的 loginStatus，决定是展示当前 Login 页面还是跳转到首页。组件一定要写在 render 函数的返回值中才能生效。

```js
// Login组件
render() {
  const { loginStatus } = this.props; 
  if (!loginStatus) {
    return (
      <LoginWrapper>
      	<LoginBox>
          <Input placeholder='账号' ref={(input) => {this.account=input}}/>
          <Input placeholder='密码' type='password' ref={(input) => {this.password=input}}/>
          <Button onClick={() => {this.props.login(this.account, this.password)}}>提交					</Button>
				</LoginBox>
			</LoginWrapper> 
   	)
	  } else {
  return <Redirect to='/' />
  }
}

```

登录成功跳转到首页后点击退出需要改变 store 中的 loginStatus，在 Header 组件中需要给退出绑定一个点击事件，事件处理程序中派发一个 action。由于这个 action 是和 login 相关的而且也是改变 login 中的 loginStatus，所以创建 action 的函数和 actionTypes 都定义在 login 文件夹中，当然这个并不是必须的，使用 header 文件夹下的 actionCreators 和 actionTypes 也可以但是这样就有点乱了。无论是在哪个组件中派发出的 action，store 接收到 action 之后会将转发到所有的 reducer 中。所以在 login 下的 reducer 处理这个 action 即可。

```js
// Header组件
{ loginStatus ? <span onClick={logout}>退出</span> : <Link to='/login'>登录</Link> }
 logout() {
   dispatch(loginActionCreators.logoutStatus());
 }
 
 // Login组件
 // actionCreators.js
export const logoutStatus = () => ({
  type: actionTypes.LOGOUT_STATUS,
  loginStatus: false
});
 // actionTypes.js
export const LOGOUT_STATUS = 'login/LOGOUT_STATUS';
// reducer.js
case actionTypes.LOGOUT_STATUS:
      return state.set('loginStatus', action.loginStatus);

```

### 9.7 登录鉴权

写文章这个界面只有登录之后才能进入，应该如何去做？

使用 Link 标签包裹写文章组件，当点击写文章时跳转到 Write 组件。

```js
<Link to='/write'>
  <CreateItem>
  <i className="iconfont article">&#xe601;</i>
  写文章
    </CreateItem>
</Link>

```

> 注意不要在写文章这里绑定一个 click 事件，当点击时判断是不是登录状态，当是登录状态跳转到 Write 页面，想法是对的，但是在 click 事件处理程序中是没有办法使用 Rediect 组件的，组件只有在 render 中才会生效。要转变一下思路，先跳转到 write 组件，在 write 组件中根据 loginStatus 决定是展示 Write 页面还是跳转到登录页面。

```js
render() {
  const { loginStatus } = this.props; 
  if (loginStatus) {
    return (
      <div>write</div>
    )
  } else {
    return <Redirect to='/login' / >                                                                                       
 }
}

```

### 9.8 异步组件

当不使用异步组件时，所有的组件内容都会一起加载到 `bundle.js`  中，例如当我们访问首页时，详情页和登录等页面都没有用到但是也会一起加载，因为 bundle.js 中包含了所有页面的 js 代码。这样会导致 `bundle.js` 文件很大，而且加载速度比较慢。

使用异步组件时当访问首页时只会加载首页的代码，详情等页面的 js 代码不会被加载。异步组件底层非常复杂，但是可以使用第三方模块来实现，这里使用 react-loadable。

这里要实现详情页面的代码只有在访问详情页时才会被加载。

在 detail 文件夹下新建 loadable.js 

```js
import React, { PureComponent } from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  // 这里的import和上面的import是不一样的这里是异步加载的一个语法
  // 这里指的是异步加载 index.js 下的 Detail 组件
  loader: () => import('./'),
  // 页面加载需要时间，下面的 loading是一个函数，表示临时显示的内容，不至于让用户看到白屏
  loading() {
    return <div>正在加载</div>
  }
});

// 导出一个无状态组件，LoadableComponent 实际上就是 Detail 组件
export default () => <LoadableComponent/>

```

现在 Detail 组件就变成了一个异步组件，在 App.js 引入时要改变一下路径。（名字不用改，因为用的是 export default）

```js
import Detail from './pages/detail/loadable';

```

现在进入详情页时会报错。

![1585535638831](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200330023555%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6parms.png)

这是因为 App.js 中 Detail 组件的引入路径变了，名字虽然还是叫 Detail 但是实际上是 loadable 中定义的组件。

```js
import Detail from './pages/detail/loadable';

<Route path='/detail' exact component={Detail}></Route>  

```

由于 Detail 组件是 Router  的属性，这个时候 Detail 组件变为了路由组件，路由组件时可以获取到 props 中的history，match，location 等属性。但是原来的 ./pages/detail 下的 Detail 组件现在并不是路由组件了，所以也就不能获取到 match 等属性了。

withRouter 方法可以将一个组件变为路由组件，这样就可以获取到 match 等属性了，所以在 ./pages/detail 下的 index.js 下做以下修改。

```js
import { withRouter } from 'react-router-dom';

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail);

```

当访问首页时只有一个 bundle.js 文件，其中是不包含 Detail 组件的代码的。

![1585536833129](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/不包含详情页代码.png)

当进入详情页时，会再加载一个详情页面的代码。

![1585536892305](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/单独加载详情页代码.png)



**withRouter的作用**

1）目的就是让被修饰的组件可以从属性中获取history,location,match

路由组件可以直接获取这些属性，而非路由组件就必须通过withRouter修饰后才能获取这些属性了，比如

```xml
<Route path='/' component={App}/>

```

App组件就可以直接获取路由中这些属性了，但是，如果App组件中如果有一个子组件Foo，那么Foo就不能直接获取路由中的属性了，必须通过withRouter修饰后才能获取到。

2）withRouter是专门用来处理数据更新问题的。

在使用一些redux的的`connect()`或者mobx的`inject()`的组件中，如果依赖于路由的更新要重新渲染，会出现路由更新了但是组件没有重新渲染的情况。这是因为redux和mobx的这些连接方法会修改组件的`shouldComponentUpdate`。

在使用withRouter解决更新问题的时候，一定要保证withRouter在最外层，比如`withRouter(connect(Component))`
