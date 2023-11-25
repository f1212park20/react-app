import React, {Component} from 'react';
import "./App.css"

export default class App extends Component{

  state={
    // todoData:[
    //   {
    //     id:"1",
    //     title:"공부하기",
    //     completed:true,
    //   },
    //   {
    //     id:"2",
    //     title:"청소하기",
    //     completed: false,
    //   },
    // ],
    todoData: [],
    value: ""
  }

  btnStyle={
     color: "#fff",
     border: "none",
     padding:"5px 9px",
     borderRadius:"50%",
     cursor:"pointer",
     float:"right", 
  }

  getStyle = (completed) =>{
    return{
      padding:"10px",
      borderBottom:"1px #ccc dotted",
      textDecoration: completed ?  "line-through" : "none",

    }
  }

  // 삭제버튼
  handleClick = (id) =>{
    
    let newtodoData=this.state.todoData.filter((data) => data.id !==id);
    // console.log("todoData:", todoData);
    this.setState({ todoData: newtodoData})
    
  };

  // 검색어 입력 창
  handChanage = (e) =>{
    // e.target.value -> 검색어 데이터 출력
    console.log(e.target.value);
    this.setState({ value: e.target.value})
    
  }

  // 선택 후 줄긋기
  handleCompleteChane = (id) =>{
    let newTodoData=this.state.todoData.map(data=>{
      if(data.id === id){
        // true -> false
        data.completed = !data.completed;

      }
      return data;
    })

    this.setState({todoData: newTodoData})
  }


  handleSubmit = (e) =>{
    // 페이지 리로드 방지
    e.preventDefault();

    // 새로운 할일 데이터 
    let newTodo={
      id:Date.now(),
      title:this.state.value,
      completed:false,
    }

    // 원래 있던 할일에 새로운 할 일 더해 주기 
    // value: ""-> 추가시 검색창 초기화
    this.setState({ todoData: [...this.state.todoData, newTodo], value: ""});
  }


  render(){
    return (
    <div className="container">
        <div className='todoBlock'>
            <div className='title'>
                <h1>할 일 목록</h1>
                  {/* <div style={this.getStyle()}>
                    <input type='checkbox' defaultChecked={false}/>
                    공부하기
                    <button style={this.btnStyle}>x</button>
                  </div> */}

                  {this.state.todoData.map((data)=>(
                      <div style={this.getStyle(data.completed)}  Key={data.id}>
                      <input type='checkbox' defaultChecked={false}  onChange={()=> this.handleCompleteChane(data.id)}/>
                      {data.title}

                      <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
                    </div>  
                  ))}

                  <form style={{display:'flex'}} onSubmit={this.handleSubmit}>
                     <input
                      type='text'
                      name='value'
                      style={{ flex:'10', padding:'5px'}}
                      value={this.state.value}
                      onChange={this.handChanage}
                     />
                     <input
                        type="submit"
                        value="입력"
                        className='btn'
                        style={{flex:'1'}}
                     />
                      
                  </form>
                  
            </div>
        </div>
    </div>
    );
  }
}



