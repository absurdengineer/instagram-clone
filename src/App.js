import './App.css';
import Post from './components/post/post.component';
import image from './assets/images/1.jpg'
function App() {
  return (
    <div className="App">
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Logo" className="app__headerImage"/>
      </div>
      <h1>Hello Clever Programmers Let's build an Instagram clone with React !!!</h1>
      <Post username="dilshad_i_am" imageUrl={image} caption="Lets Build React" />
      <Post username="rebel_partha9" imageUrl={image} caption="I Love Python" />
      <Post username="belal8080" imageUrl={image} caption="JavaScript is Amazing" />
    </div>
  );
}

export default App;
