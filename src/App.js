import React from 'react';
import Todo from './Todo';
import { Paper, List, Container } from "@material-ui/core";
import './App.css';
import AppTodo from './AppTodo';
import { call } from './service/ApiService';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    call("/car", "GET", null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  // (1) 함수 추가
  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; // key를 위한 id 추가
    item.done = false; // done 초기화
    thisItems.push(item); // 리스트에 아이템 추가
    this.setState({ items: thisItems }); // 업데이트는 반드시 this.setState로 해야 됨
    console.log("items : ", this.state.items);
  }

  // 함수 작성
  delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before Update Items : ", this.state.items)
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      // 디버깅 콜백
      console.log("Update items : ", this.state.items)
    });
  }



  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id}  delete ={this.delete} />
          ))}
        </List>
      </Paper>
    );
    

    return (

      <div className="App">
        <Container maxWidth="md">
          <AppTodo add = {this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}

export default App;