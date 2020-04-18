import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let size = 20;

function Square(props) {
    return (
      <button className="square" onClick={props.onClick} value={props.value}>
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
            />;
    }

    renderRowTest(){
      let all = [];
    //   let sq_id=0;
      // for(let i=4;i<9;i++){
      //     let row = '<div className="board-row">';
      //     for(let j=0;j<i;j++){
      //       row.concat('{this.renderSquare('+ sq_id +')}');
      //       sq_id++;
      //     }
      //     row.concat('</div>');
      //     all.concat(row);
      // }
      for(let i=0;i<5;i++){
        all.push(this.renderSquare(i+7));
      }      
      return all;
    }

    renderRow(n){
      let all =[];
      for(let i=0;i<(5+n);i++){
        all.push(this.renderSquare(i+7));
      }      
      return all;

    }

    renderTest(){
      // let all = '<div class="test"></div>';
      // return (<div className='square'></div>);
    //   return <Gamerow />;
    }

    render() {
      

      return (
        <div className="game-board">
        <div>
          <div className="board-row">
            {this.renderSquare([0,0])}
            {this.renderSquare([0,1])}
            {this.renderSquare([0,2])}
          </div>
          {/* <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div> */}
        </div>
        {/* {this.renderTest()} */}
        {/* {this.renderRow(3)} */}
        {/* <div className="board-row"><Gamerow id="0" num="5"/></div>
        <div className="board-row"><Gamerow id="1" num="6"/></div>
        <div className="board-row"><Gamerow id="2" num="7"/></div>
        <div className="board-row"><Gamerow id="3" num="8"/></div>
        <div className="board-row"><Gamerow id="4" num="9"/></div>
        <div className="board-row"><Gamerow id="5" num="8"/></div>
        <div className="board-row"><Gamerow id="6" num="7"/></div>
        <div className="board-row"><Gamerow id="7" num="6"/></div>
        <div className="board-row"><Gamerow id="8" num="5"/></div> */}
        </div>
      );
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
