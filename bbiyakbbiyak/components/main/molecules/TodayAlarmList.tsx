import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { GlobalTheme } from '../../../constants/theme'
import TodayAlarmDetails from './TodayAlarmDetails'
import { TodayAlarmListStyles } from './TodayAlarmList.style'

const TodayAlarmList = ({ item, routeName }: any) => {

  const category = item?.category;

  const convertToAmPm = (timeString) => {
    // 시간 문자열을 "시:분:초" 형식으로 분할
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // 24시간을 12시간제로 변환
    const period = hours >= 12 ? '오후' : '오전'; // 오후는 12시 이후
    const adjustedHours = hours % 12 || 12; // 12시를 기준으로 계산, 0시는 12시로 변환

    // AM/PM 형식으로 변환
    return `${period} ${adjustedHours}:${minutes.toString().padStart(2, '0')}`;
  }

  const time = convertToAmPm(item.targetTime);


  // let initCount = item.alarmItem.filter(alarmItem => alarmItem.isTaken === true).length;
  // const initAllSpecifiedTakenByTime = initCount === item.alarmItem.length ? true : false
  // const [allSpecifiedTakenByTime, setAllSpecifiedTakenByTime] = useState(initAllSpecifiedTakenByTime);

  // const [count, setCount] = useState(initCount);

  // const itemsCount = item.alarmItem.length;


  // if (item.targetTime)

  // 여기도 데이터 받아온 값으로 개수 설정해야 한다.
  // const allTakenHandler = () => {
  //   if (count >= 0 && count !== item.alarmItem.length) {
  //     setCount(item.alarmItem.length);
  //     setAllSpecifiedTakenByTime(true)
  //   } else if (count === item.alarmItem.length) {
  //     setCount(0)
  //   }
  // }

  // useEffect(() => {
  //   if (count === (item.alarmItem.length)) {
  //     setAllSpecifiedTakenByTime(true)
  //   } else if (count < item.alarmItem.length) {
  //     setAllSpecifiedTakenByTime(false)
  //   }
  // }, [count])


  return (
    <>
      <View style={TodayAlarmListStyles.rootContainer}>

        <View style={{ flex: 22, paddingTop: 4 }}>
          {/* <Pressable onPress={allTakenHandler}> */}
          <View style={TodayAlarmListStyles.allSelectContainer}>
            <View style={TodayAlarmListStyles.iconTimeContainer}>
              {/* 시계 아이콘 */}
              <Ionicons
                name='alarm'
                size={24}
                color={GlobalTheme.colors.accent500}
                style={TodayAlarmListStyles.iconClock} />

              {/* 시간 */}
              <Text style={TodayAlarmListStyles.timeText}>
                {time}
              </Text>
            </View>

            {/* 전체 선택 */}
            {/* <View style={TodayAlarmListStyles.iconDotContainer}>
              <Ionicons
                name='radio-button-on'
                size={20}
                color={allSpecifiedTakenByTime ? GlobalTheme.colors.primary500 : '#999'} />
            </View> */}

          </View>
          {/* </Pressable> */}

        </View>



        {/* 세부 알람 컴포넌트 */}
        <FlatList
          data={item?.alarmItem ? item.alarmItem : item.alarmLogItems}

          style={TodayAlarmListStyles.detailFlatListContainer}

          renderItem={({ item }) =>
          (
            <TodayAlarmDetails
              item={item}
              // itemsCount={itemsCount}
              // count={count}
              // setCount={setCount}
              // allSpecifiedTakenByTime={allSpecifiedTakenByTime}
              routeName={routeName}
              category={category}
            />
          )
          } />

      </View>


      {/* 구분선 */}
      <View style={TodayAlarmListStyles.dividerContainer}>
        <View style={TodayAlarmListStyles.divider}>
        </View>
      </View>
    </>
  )
}

export default TodayAlarmList
