import './App.scss';
import Game from './Game';

function App() {

const Tela = () => {
  return (
    <div className='borda'>
      <div className='tela'>
        <Game />
      </div>
    </div>
  );
}

const Controle = () => {
  return (
    <div className="controles">
      <div className="direcional">
        <div className="lado">
          <button className="esq"/>
        </div>
        <div className="centro">
          <button className="cima"/>
          <button className="baixo"/>
        </div>
        <div className="lado">
          <button className="dir"/>
        </div>
      </div>
      <div className="divisao"></div>
      <div className="botoes">
        <div className="botaoA">
          <button>A</button>
        </div>
        <div className="botaoB">
          <button>B</button>
        </div>
      </div>
    </div>
  )
}

  return (
    <div className="App">
      <Tela/>
      <Controle/>
    </div>
  );
}

export default App;
