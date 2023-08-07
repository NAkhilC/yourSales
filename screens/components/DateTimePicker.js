import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateTimePickerComponent({ formData, setFormData, type }) {
  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
    if (type == "from") {
      setFormData({ ...formData, eventStart: currentDate });
    } else {
      setFormData({ ...formData, eventEnd: currentDate });
    }
  };

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        value={date}
        mode="datetime"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
}
