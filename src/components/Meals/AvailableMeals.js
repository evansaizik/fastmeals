import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://food-app-f4d03-default-rtdb.firebaseio.com/meals.json');
  
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
          throw new Error('Something went wrong!')
        }
        const loadedMeals = [];
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        };
  
        setMeals(loadedMeals);
        
      } catch (error) {
        setError(error.message);
      }
    };
    // fetchMeals().catch((error) => {
    //   setError(error.message)
    // });
    fetchMeals();
    setIsLoading(false);
  }, [isLoading]);

  if (isLoading) { 
    return <section className={classes.MealsLoading}>
      <p>Loading Meals...</p>
    </section>
  }

  if (error) {
    return <section className={classes.MealsLoading}>
      <p className={classes.mealsError}>{error}</p>
    </section>
  }

  const mealsList = meals.map(meal => {
    return <MealItem 
      key={meal.id} 
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
};

export default AvailableMeals;