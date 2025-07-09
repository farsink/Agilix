export const mapWorkoutDescription = (workout: string) => {
    const descriptionMap: { [key: string]: string } = {

        
  "Upper Body": "Upper body workouts focus on building strength and muscle in the chest, shoulders, back, and arms. These routines often include pushing and pulling movements like bench presses, overhead presses, rows, pull-ups, and arm curls. They help improve posture, core stability, and overall functional strength for daily tasks and sports. Regular training can increase definition and upper body endurance.",
  
  "Cardio": "Cardio workouts are designed to improve heart health, lung capacity, and endurance by increasing your heart rate for an extended period. Exercises like running, cycling, or swimming are common and help with fat loss, metabolism, and mood improvement. It's a great way to build stamina while supporting weight management and overall energy levels.",
  
  "Strength & Conditioning": "Strength and conditioning combines resistance training with dynamic movements to build overall power, endurance, and performance. Workouts typically include squats, deadlifts, push-ups, and high-intensity bodyweight moves. It's perfect for building muscle while staying agile, improving athleticism, and burning calories efficiently.",
  
  "Cardio Intervals": "Cardio interval training alternates between short bursts of intense effort and brief recovery periods. This method is highly effective for improving cardiovascular fitness, burning fat, and increasing speed and endurance. Exercises like sprints, HIIT circuits, or rowing intervals keep the body challenged and metabolism high even after the workout ends.",
  
  "Lower Body": "Lower body workouts target the major muscles of your legs and glutes including quads, hamstrings, calves, and glutes. Movements like squats, lunges, and deadlifts build lower body strength, stability, and balance. These exercises enhance athletic power, boost metabolism, and improve mobility for daily movement.",
  
  "Light Cardio & Stretching": "Active recovery days focus on gentle movement and flexibility. Light cardio like walking or yoga boosts circulation without overloading the muscles. Stretching helps reduce stiffness, improves mobility, and promotes recovery after intense training days. It’s essential for preventing injury and maintaining consistency.",
  
  "Complete Rest": "Rest days are crucial for muscle repair, hormone balance, and overall recovery. Taking a full day off allows the body to adapt to previous workouts, preventing burnout and overtraining. It supports physical and mental well-being, helping you return stronger for the next session."


    };
    return descriptionMap[workout] || '';
}