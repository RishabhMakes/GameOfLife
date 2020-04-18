import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let size = 20;

function Square(props) {
    return (
      <button className="square" onClick={props.onClick} value={props.value} key= {props.i}>
      </button>
    );
}

class Board extends React.Component {
    constructor(props){
      super(props);

      let cells = [];
      for(let i=0; i<size; i++){
        let row = Array(size).fill(false);  
        cells.push(row);
      } 
      
      this.state={
       cells: cells,
      }
      
    }

    handleClick(i){
        const cells = this.state.cells.slice();
        cells[i[0]][i[1]] = !cells[i[0]][i[1]];

        this.setState({
            cells: cells
        });
    }
    
    renderSquare(i) {
      return <Square value={this.state.cells[i[0]][i[1]]}
                     onClick={() => this.handleClick(i)}
                     key = {i}
            />;
    }

    renderRow(n){
      let all =[];
      for(let i=0; i<size; i++){
        all.push(this.renderSquare([n,i]));      
      }
      return (
          <div className="board-row" key={n}>
          {all}
          </div>
      );

    }

    render() {
      let all = [];
      for (let i=0;i<size;i++){
          all.push(this.renderRow(i))
      }
      return all;
    }
  }


class Game extends React.Component {
    render() {
      return (
        <div className="game">
          
            <Board />
     
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
