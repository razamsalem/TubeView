import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { SIZES } from "../constants"

interface SubjectPillsProps {
    subjects: string[]
    selectedSubject: string
    setSelectedSubject: (subject: string) => void
}

export default function subjectPills({ subjects, selectedSubject, setSelectedSubject }: SubjectPillsProps) {

    return (
        <FlatList
            data={subjects}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[styles.subjectPill, selectedSubject === item && styles.selectedSubject]}
                    onPress={() => setSelectedSubject(item)}
                >
                    <Text style={styles.subjectText}>{item}</Text>
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    subjectPill: {
        paddingHorizontal: SIZES.medium,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: SIZES.large,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectedSubject: {
        backgroundColor: "#3498db",
        borderColor: "#3498db",
    },
    subjectText: {
        color: "#333",
    },
})