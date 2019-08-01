import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // Manipulação de estados
  const [techs, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  // handleAdd sendo inserido diretamente na função faz com que ele
  // seja apagada e recriada em cada renderização. Para que isso fique em
  // memória e não seja recriada o tempo todo, existe o useCallback
  const handleAdd = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  // didMount
  useEffect(() => {
    const storageTechs = localStorage.getItem('techs');

    if (storageTechs) {
      setTech(JSON.parse(storageTechs));
    }
  }, []);

  // didUpdate
  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  // useMemo é usado em calculos, para que não seja inserido diretamente
  // no render da função e ter que recalcular sempre
  const techSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <ul>
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
