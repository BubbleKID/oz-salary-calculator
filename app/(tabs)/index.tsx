import {
  Image,
  StyleSheet,
  Platform,
  View,
  TextInput,
  Text,
  Switch,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/Header";
import React from "react";
import {
  calculateFullPayBreakdown,
  calculateTaxBreakDown,
} from "../utils/calculatorUtils";
import { PERIODS } from "@/constants/Period";

export default function HomeScreen() {
  const [salary, setSalary] = React.useState("");
  const [timePeriod, setTimePeriod] = React.useState(52);
  const [taxYear, setTaxYear] = React.useState("2023-2024");
  const [superPercentage, setSuperPercentage] = React.useState("11");
  const [includesSuper, setIncludesSuper] = React.useState(false);
  const [taxBreakDown, setTaxBreakDown] = React.useState({
    takeHomePay: 0,
    totalTaxes: 0,
    medicareLevy: 0,
    takeHomePayPercentage: 1,
    totalTaxesPercentage: 0,
  });

  const [fullPayBreakdown, setFullPayBreakdown] = React.useState({
    takeHomePay: 0,
    taxableIncome: 0,
    superannuation: 0,
    totalTaxes: 0,
  });

  const onSalaryChange = (salary: string) => {
    const breakDown = calculateTaxBreakDown(salary);
    setTaxBreakDown(breakDown);
    const newFullPayBreakdown = calculateFullPayBreakdown(
      breakDown.takeHomePay,
      breakDown.totalTaxes,
      0.11,
      timePeriod
    );
    setFullPayBreakdown(newFullPayBreakdown);
    setSalary(salary);
  };

  const onTimerPeriodChange = (timePeriod: number) => {
    const breakDown = calculateTaxBreakDown(salary);
    const newFullPayBreakdown = calculateFullPayBreakdown(
      breakDown.takeHomePay,
      breakDown.totalTaxes,
      0.11,
      timePeriod
    );
    setFullPayBreakdown(newFullPayBreakdown);
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView style={styles.scrollView}>
        <Header />

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Your Pay</Text>
            <TextInput
              style={styles.input}
              placeholder="$"
              value={salary}
              onChangeText={onSalaryChange}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Time period</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={timePeriod}
                style={styles.picker}
                onValueChange={(itemValue) => setTimePeriod(itemValue)}
              >
                <Picker.Item label="Annually" value={1} />
                <Picker.Item label="Monthly" value={1} />
                <Picker.Item label="Fortnightly" value={1} />
                <Picker.Item label="Weekly" value={1} />
              </Picker>
            </View>
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Tax year</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={taxYear}
                style={styles.picker}
                onValueChange={(itemValue) => setTaxYear(itemValue)}
              >
                <Picker.Item label="2023-2024" value="2023-2024" />
                <Picker.Item label="2022-2023" value="2022-2023" />
                <Picker.Item label="2021-2022" value="2021-2022" />
              </Picker>
            </View>
          </View>

          <View>
            <Text style={styles.label}>Super (%)</Text>
            <TextInput
              style={styles.input}
              placeholder="Super (%)"
              value={superPercentage}
              onChangeText={setSuperPercentage}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.switchRow}>
            <Text>Pay includes superannuation</Text>
            <Switch value={includesSuper} onValueChange={setIncludesSuper} />
          </View>
        </View>

        <View style={styles.tabsSection}>
          <Button
            title="Weekly"
            color="#2196F3"
            onPress={() => onTimerPeriodChange(52)}
            accessibilityLabel="Weekly"
          />
          <Button
            title="Fortnightly"
            color="#2196F3"
            onPress={() => onTimerPeriodChange(26)}
            accessibilityLabel="Fortnightly"
          />
          <Button
            title="Monthly"
            color="#2196F3"
            onPress={() => onTimerPeriodChange(12)}
            accessibilityLabel="Monthly"
          />
          <Button
            title="Annually"
            color="#2196F3"
            onPress={() => onTimerPeriodChange(1)}
            accessibilityLabel="Annually"
          />
        </View>

        <View style={styles.resultSection}>
          <Text style={styles.resultText}>
            Take home pay ${fullPayBreakdown.takeHomePay.toFixed(2)}
          </Text>
          <Text style={styles.resultText}>
            Taxable income ${fullPayBreakdown.taxableIncome.toFixed(2)}
          </Text>
          <Text style={styles.resultText}>
            Superannuation ${fullPayBreakdown.superannuation.toFixed(2)}
          </Text>
          <Text style={styles.resultText}>
            Total taxes ${fullPayBreakdown.totalTaxes.toFixed(2)}
          </Text>
        </View>

        <View style={styles.breakdownSection}>
          <Text>Your salary breakdown</Text>
          <View style={styles.breakdownBar}>
            <View
              style={[
                styles.breakdownFill,
                { flex: taxBreakDown.takeHomePayPercentage },
              ]}
            />
            <View
              style={[
                styles.breakdownEmpty,
                { flex: taxBreakDown.totalTaxesPercentage },
              ]}
            />
          </View>
          <Text>Take home pay ${taxBreakDown.takeHomePay.toFixed(2)}</Text>
          <Text>Total taxes ${taxBreakDown.totalTaxes.toFixed(2)}</Text>
          <Text>Base salary ${salary}</Text>
        </View>

        <View style={styles.totalSalarySection}>
          <Text>Total salary including super</Text>
          <Text>
            Superannuation is paid by your employer on top of your base salary
          </Text>
          <View style={styles.totalSalaryBar}>
            <View style={[styles.baseSalaryFill, { flex: 90 }]} />
            <View style={[styles.superFill, { flex: 10 }]} />
          </View>
          <Text>Base salary $84K</Text>
          <Text>Super $9.2K</Text>
        </View>
        {/* <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this starter app.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run{' '}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView> */}
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

const styles = StyleSheet.create({
  inputContainer: {
    // flexDirection: 'column',
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 4,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  MainContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    // backgroundColor: 'white',
    marginHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  inputSection: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    flex: 1,
    marginRight: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  tabsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "blue",
    color: "blue",
  },
  resultSection: {
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
  breakdownSection: {
    marginBottom: 20,
  },
  breakdownBar: {
    flexDirection: "row",
    height: 10,
    marginVertical: 10,
  },
  breakdownFill: {
    backgroundColor: "rgb(230, 2, 120)",
  },
  breakdownEmpty: {
    backgroundColor: "rgb(29, 85, 157)",
  },
  totalSalarySection: {
    marginBottom: 20,
  },
  totalSalaryBar: {
    flexDirection: "row",
    height: 10,
    marginVertical: 10,
  },
  baseSalaryFill: {
    backgroundColor: "teal",
  },
  superFill: {
    backgroundColor: "darkblue",
  },
});
