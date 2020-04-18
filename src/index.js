import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let size = 40;

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
       animate:false,
      }
      
    }

    animate(){
        if(this.state.animate){
            clearInterval(this.timerID);
            this.setState({animate: false});
        }
        else{
            this.timerID = setInterval(
                () => this.nextGeneration(),
                500
            );
            this.setState({animate: true});
        }
      
    }


    clear(){
        let cells = [];
        for(let i=0; i<size; i++){
            let row = Array(size).fill(false);  
            cells.push(row);
        }

        this.setState({
            cells: cells
        });
    }

    nextGeneration(){
        const cells = JSON.parse(JSON.stringify(this.state.cells));
        const cells_new = JSON.parse(JSON.stringify(this.state.cells));
        for(let i=1;i<(size-1);i++){
            for(let j=1;j<(size-1);j++){
                let neighbours = checkNeighbours([i,j]);
                if(cells[i][j]){
                    if(neighbours<2 || neighbours>3){
                        cells_new[i][j]=false;
                    } else if(neighbours===2 || neighbours===3){
                        cells_new[i][j]=true;
                    }
                } else if(neighbours===3){
                    cells_new[i][j]=true;
                }
            }
        }
    
        function checkNeighbours(n){
            
            // console.log('cell ', n[0], n[1], ':' )                      
            let count=0;
            let r,c;
            for( r = -1; r<2; r++){
                for(c = -1; c<2 ; c++){
                    // console.log(r, c, cells[(n[0]+r)][(n[1]+c)]);
                    if(cells[(n[0]+r)][(n[1]+c)]){
                        count++;
                        // console.log(count);
                    }
                }
            }
            if(cells[n[0]][n[1]]){
                count--;
            }
            // console.log('count: ', count)
            return count;        
        }
        // console.log(cells_new);
        this.setState({
            cells: cells_new
        });
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
      let all_rows = [];
      for (let i=0;i<size;i++){
          all_rows.push(this.renderRow(i))
      }
      return (
          <div className='big_board'>
          <div className='cells'>
          {all_rows}
          </div>
          <div className='controls'>
          <button onClick={() => this.animate()}>Animate on/off</button>
          <button onClick={() => this.nextGeneration()}>Next</button>
          <button onClick={() => this.clear()}>Clear</button>
          </div>
          </div>
      );
    }
  }


class Game extends React.Component {
// ------------Will come back to it after finishing animation--------------
    // constructor(props){
    //     super(props);
        
    //     let cells = [];
    //     for(let i=0; i<size; i++){
    //         let row = Array(size).fill(false);  
    //         cells.push(row);
    //     } 
        
    //     this.state={
    //         history:[cells] ,
    //     }

    // }
    
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


