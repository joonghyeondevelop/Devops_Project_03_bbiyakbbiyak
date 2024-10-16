import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import CategoryTabsStyles from './CategoryTabs.style';
import CategoryButton from './CategoryButton';


const CategoryTabs = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();


  const [selectedCategory, setSelectedCategory] = useState('medicine');
  const [calendarStr, setCalendarStr] = useState('')


  const buttonSelectedHandler = (category: any) => () => {
    setSelectedCategory(category);
    let tempCategory = category.replace('Calendar', '');
    navigation.navigate(category, { category: tempCategory });
  }

  useEffect(() => {
    if (route.name === 'main') {
      setCalendarStr('')
    } else if (route.name === 'logCalendar') {
      setCalendarStr('Calendar')
    }
  }, [route.name])


  return (
    <>
      <View style={CategoryTabsStyles.container}>

        <CategoryButton
          buttonSelectedHandler={buttonSelectedHandler}
          category={`medicine${calendarStr}`}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          routeName={route.name}
          buttonText={'약'}
        />

        <CategoryButton
          buttonSelectedHandler={buttonSelectedHandler}
          category={`drink${calendarStr}`}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          routeName={route.name}
          buttonText={'물, 음료'}
        />

        <CategoryButton
          buttonSelectedHandler={buttonSelectedHandler}
          category={`etc${calendarStr}`}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          routeName={route.name}
          buttonText={'기타'}
        />

      </View >
    </>
  )
}

export default CategoryTabs
