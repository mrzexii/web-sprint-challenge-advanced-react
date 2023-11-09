importReactfrom'react'
importaxiosfrom'axios'
export default class AppClassextendsReact.Component{
  
  constructor(props) {
    super(props);
    this.state={
      XY:{ X:2, Y:2},
      index:4,
      steps:0,
      message:'',
      email:'',
    };
  }
  getXY=(value) =>{
    constX=value%3+1;
    constY=parseInt(value/3) +1;
    this.setState({ XY:{ X, Y} });
  }
  
  reset=() =>{
    
    this.setState({
      XY:{ X:2, Y:2},
      index:4,
      steps:0,
      message:'',
      email:'',
    });
  }
  getNextIndex=(direction) =>{
  
    const{ index} =this.state;
    switch(direction) {
      case'left':
        if(index%3===0) returnindex;
        else{
          constnextIndex=index-1;
          this.setState({ index:nextIndex});
          returnnextIndex;
        }
      case'right':
        if(index%3===2) returnindex;
        else{
          constnextIndex=index+1;
          this.setState({ index:nextIndex});
          returnnextIndex;
        }
      case'up':
        if(parseInt(index/3) ===0) returnindex;
        else{
          constnextIndex=index-3;
          this.setState({ index:nextIndex});
          returnnextIndex;
        }
      case'down':
        if(parseInt(index/3) ===2) returnindex;
        else{
          constnextIndex=index+3;
          this.setState({ index:nextIndex});
          returnnextIndex;
        }
      default:
        break;
    }
  }
  move=(evt) =>{
    
    const{ index, steps} =this.state;
    this.setState({ message:''})
    letnextValue;
    switch(evt) {
      case'left':
        nextValue=this.getNextIndex('left');
        if(index===nextValue) this.setState({ message:"You can't go left"});
        else{
          this.setState((prevState) =>({
            index:nextValue,
            steps:prevState.steps+1,
          }));
          this.getXY(nextValue);
        }
        break;
      case'right':
        nextValue=this.getNextIndex('right');
        if(index===nextValue) this.setState({ message:"You can't go right"});
        else{
          this.setState((prevState) =>({
            index:nextValue,
            steps:prevState.steps+1,
          }));
          this.getXY(nextValue);
        }
        break;
      case'up':
        nextValue=this.getNextIndex('up');
        if(index===nextValue) this.setState({ message:"You can't go up"});
        else{
          this.setState((prevState) =>({
            index:nextValue,
            steps:prevState.steps+1,
          }));
          this.getXY(nextValue);
        }
        break;
      case'down':
        nextValue=this.getNextIndex('down');
        if(index===nextValue) this.setState({ message:"You can't go down"});
        else{
          this.setState((prevState) =>({
            index:nextValue,
            steps:prevState.steps+1,
          }));
          this.getXY(nextValue);
        }
        break;
      default:
        break;
    }
  }
  onSubmit=(evt) =>{
    evt.preventDefault();
    const{ XY, steps, email} =this.state;
    if(!email) {
      this.setState({ message:"Ouch: email is required"});
      return;
    }
  
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setState({ message:"Ouch: email must be a valid email"});
      return;
    }
    axios
      .post(' http://localhost:9000/api/result', {
        email,
        x:XY.X,
        y:XY.Y,
        steps,
      })
      .then((res) =>{
        this.setState({ message:res.data.message});
      })
      .catch((res, error) =>{
        this.setState({ message:res.response.data.message});
      });
    this.setState({ email:''});
  }
  
  render() {
    const{ className} =this.props
    const{ XY, index, steps, message, email} =this.state;
    return(
      <divid="wrapper"className={className}>
        <divclassName="info">
          <h3id="coordinates">Coordinates ({XY.X}, {XY.Y})</h3>
          <h3id="steps">You moved {steps}{this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <divid="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))}
        </div>
        <divclassName="info">
          <h3id="message">{message}</h3>
        </div>
        <divid="keypad">
          <buttonid="left"onClick={() => this.move('left')}>LEFT</button>
          <buttonid="up"onClick={() => this.move('up')}>UP</button>
          <buttonid="right"onClick={() => this.move('right')}>RIGHT</button>
          <buttonid="down"onClick={() => this.move('down')}>DOWN</button>
          <buttonid="reset"onClick={() => this.reset()}>reset</button>
        </div>
        <formonSubmit={(e) => this.onSubmit(e)}>
          <inputid="email"type="email"value={this.state.email}placeholder="type email"onChange={(e) => this.setState({ email: e.target.value })}></input>
          <inputid="submit"type="submit"></input>
        </form>
      </div>
    )
  }
}
