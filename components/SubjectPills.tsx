import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { COLORS, SIZES } from "../constants"

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
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    style={[
                        styles.subjectPill,
                        selectedSubject === item && styles.selectedSubject,
                        index === 0 && styles.firstPill
                    ]}
                    onPress={() => setSelectedSubject(item)}
                >
                   <Text style={[styles.subjectText, selectedSubject === item && styles.selectedSubjectText]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    subjectPill: {
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.xxSmall,
        marginRight: SIZES.xxSmall,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.xxSmall
    },
    firstPill: {
        marginLeft: SIZES.xxSmall,
    },
    selectedSubject: {
        backgroundColor: COLORS.primary,
    },
    subjectText: {
        color: "#333",
        fontWeight: 'bold'
    },
    selectedSubjectText: {
        color: COLORS.white,
    }
})