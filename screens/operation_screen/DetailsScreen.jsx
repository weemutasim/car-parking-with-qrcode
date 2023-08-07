import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState } from 'react'

const DetailsScreen = () => {
    const [timeIn, setTimeIn] = useState('');
    const [timeOut, setTimeOut] = useState('');
    const [price, setPrice] = useState(null);

    const [startHours, startMinutes] = timeIn.split(":").map(Number);
    const [endHours, endMinutes] = timeOut.split(":").map(Number);

    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = endHours * 60 + endMinutes;
    const sumMinutes = Math.abs(totalEndMinutes - totalStartMinutes);

    const  Calculate = () => {
        let part = 0, price = 0, houreAll = 0, houre = 0, minute = 0;
        let timeDifferenceInMinutes = 0;
        if (sumMinutes >= 30) {
            if (startHours >= 21 && endHours < 6) {
                part = 50;
                console.log("(if 0) จอดเกิน 3 ทุ่ม แต่ไม่เกิน 6 โมงเช้า ========");
            } else if (startHours >= 21 && endHours >= 6) {
                part = 50;
                timeDifferenceInMinutes = Math.abs(totalEndMinutes - 360);
                houreAll = timeDifferenceInMinutes/60;
                houre = Math.floor(houreAll);
                minute = Math.round((houreAll - houre) * 60);
    
                console.log("(if 1) จอดเกิน 3 ทุ่ม แต่เกิน 6 โมงเช้า ========");
                if (minute >= 15) {
                    houre += 1;
                }
            } else if (startHours >= 6 && endHours >=21 && endHours <= 24) {
                part = 50;
                timeDifferenceInMinutes = Math.abs(totalEndMinutes - totalStartMinutes);
                houreAll = (timeDifferenceInMinutes/60) - (endHours - 21);
                houre = Math.floor(houreAll);
                minute = Math.round((houreAll - houre) * 60);
    
                console.log("(if 2) จอดหลัง 6 โมงเช้า แต่เกิน 3 ทุ่มถึงเทียงคืน ========");
                if (minute >= 15) {
                    houre += 1;
                }
            } else if (startHours >= 6 && endHours >=1 && endHours < 6) {
                let newHours = 21;
                part = 50;
                houre = Math.abs(startHours - newHours);
    
                console.log("(if 3) จอดหลัง 6 โมงเช้า แต่เกินเทียงคืนถึง 6 โมงเช้า ========");
            } else {
                timeDifferenceInMinutes = Math.abs(totalEndMinutes - totalStartMinutes);
                houreAll = timeDifferenceInMinutes/60;
                houre = Math.floor(houreAll);
                minute = Math.round((houreAll - houre) * 60);
    
                console.log("(if 4) จอดหลัง 6 โมงเช้า แต่ไม่เกิน 3 ทุ่ม ========");
                if (minute >= 15) {
                    houre += 1;
                }
            }
        } else {
            console.log("ไม่คิดค่าบริการ");
        }
        price = (houre * 20) + part;
        setPrice(price);

        console.log("เวลาเดิน = " + timeIn);
        console.log("เวลาหยุด = " + timeOut);
        console.log("นาที่รวม = " + sumMinutes);
        console.log("ช.ม.รวม = " + houre);
        console.log("ค่าจอดแบบเหมาจ่าย = " + part);
        console.log("ราคา = " + price);
        console.log("นาที่ที่ตัด = " + minute);
        console.log("\n");
    }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color: 'black', fontSize: 20}}>Start time</Text>
      <TextInput style={styles.textInput} 
        onChangeText={(text) => setTimeIn(text)}
        value={timeIn}
        />
      <Text style={{color: 'black', fontSize: 20}}>End time</Text>
      <TextInput style={styles.textInput} 
        onChangeText={(text) => setTimeOut(text)}
            value={timeOut}
        />
        <TouchableOpacity onPress={Calculate}
            style={{backgroundColor: '#097AFF', paddingVertical: 10, width: '40%', borderRadius: 20, margin: 10}}> 
            <Text style={{fontSize: 20, textAlign: 'center' ,color: 'white', fontWeight: 'bold'}}>Calculate</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 25, color: 'black', margin: 10}}>Price = {price} Baht</Text>
    </View>
  )
}   

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 10,
        margin: 10,
        width: 200,
        borderRadius: 20
    }
}) 

export default DetailsScreen