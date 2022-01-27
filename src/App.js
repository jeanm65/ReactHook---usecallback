import './App.css';
import React, {useState, useCallback} from 'react';
import Button from './Components/Button'
import Count from './Components/Count';

function App() {
  /** le Pure Component (propre aux components de types classes) et le React.memo (propre aux components de types function) sont des solutions pour remédier au problèmes d'optimisation et d'éviter de charger des élements unitilement au niveau de nos components quand les modifications n'affectent pas d'autres components. Cependant, la methode memo n'est pas toujours efficace pour prendre en charge cela, car dans notre exemple ici, nous avons 2 functions qui ont des comportements identiques, mais elles ne sont pas les mêmes, la methode memo utilisée au niveau du component Button n'est pas efficace pour les gérer car quand on modifie un ou incréments l'un d'un bouton, l'autre se charge toujours au niveau de notre console, malgré qu'il y la méthode mémo (on a toujours utilisé des console.log pour détecter cela). useCallback() est efficace pour resoudre ces problèmes.
   * 
   */

  const [countOne, setCountOne] = useState({
    value: 0,
    btnColor: 'success', // en utilisant bootstrap
    increment: 25
  });

  const [countTwo, setCountTwo] = useState({
    value: 0,
    btnColor: 'danger ', // en utilisant bootstrap
    increment: 20
  });
  
  const incrementCountOne = useCallback(
    (val) => {
        console.log('Je suis dans incrementCountOne');
        countOne.value < 100 && setCountOne({...countOne, value: countOne.value + val})
      },
    [countOne]
  )
  
  const incrementCountTwo = useCallback(
    (val) => {
    console.log('Je suis dans incrementCountTwo')
    countTwo.value < 100 && setCountTwo({...countTwo, value: countTwo.value + val})
    },
    [countTwo]
  )

  // et tous cela marche à marveille :-) useCallback renvoie une fonction de rappel mémorisée
  //
  
  return (
    <div className="container">
      <Count text='count 1' count={countOne.value} bgColor={countOne.btnColor} />
      <Count text='count 2' count={countTwo.value} bgColor={countTwo.btnColor} />

      <Button handleClick={incrementCountOne} btnColor={countOne.btnColor} increment={countOne.increment}>Count 1</Button>
      <Button handleClick={incrementCountTwo} btnColor={countTwo.btnColor} increment={countTwo.increment}>Count 2</Button>
      
    </div>
  );
}

export default App;
