// ==========================================
// 1. هيكلة بيانات الطالب (Class & Constructor)
// ==========================================
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;           // مصفوفة درجات 3 مواد
    this.attendance = attendance;   // نسبة الحضور (نسبة مئوية)
  }

  // ==========================================
  // 2. دوال التحليل الأكاديمي (Methods)
  // ==========================================
  
  // حساب متوسط درجات الطالب باستخدام reduce
  calculateAverage() {
    const total = this.grades.reduce((acc, grade) => acc + grade, 0);
    return total / this.grades.length;
  }

  // تحديد التقدير الحرفي بناءً على المتوسط
  getGradeLetter(average) {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    if (average >= 50) return 'E';
    return 'F';
  }

  // تحديد النتيجة النهائية بالتحقق من المتوسط والحضور (&&)
  getFinalStatus() {
    const avg = this.calculateAverage();
    if (avg >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// ==========================================
// 3. نظام تشغيل الجامعة (Objects Array)
// ==========================================
const studentsList = [
  new Student(101, "أحمد محمود", [85, 90, 88], 90),   // ناجح بممتاز
  new Student(102, "سارة علي", [45, 42, 48], 80),     // متعثرة (المتوسط بين 40 و 49)
  new Student(103, "عمر خالد", [40, 41, 44], 70),     // متعثر (المتوسط بين 40 و 49)
  new Student(104, "منى يوسف", [55, 60, 58], 60)      // نسبة حضور ضعيفة
];

// ==========================================
// 4. لجنة الرأفة (Array Methods)
// ==========================================

// أ) الاستخراج (filter): استخراج الطلاب الذين تتراوح متوسطاتهم بين 40 و 49
const strugglingStudents = studentsList.filter(student => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg <= 49;
});

// ب) المعالجة (map): إضافة 5 درجات رأفة لمتوسط الطلاب المتعثرين
const boostedAverages = strugglingStudents.map(student => {
  return student.calculateAverage() + 5;
});

// ج) التحليل (reduce): جمع المتوسطات الجديدة بعد إضافة درجات الرأفة
const totalBoostedAverage = boostedAverages.reduce((acc, currentAvg) => acc + currentAvg, 0);

// د) متوسط الرأفة: حساب المتوسط العام مع إضافة "درع حماية" لمنع القسمة على صفر (Ternary Operator)
const averageStruggling = strugglingStudents.length > 0 
  ? totalBoostedAverage / strugglingStudents.length 
  : 0;

// ==========================================
// 5. المخرجات (Console Logging)
// ==========================================

console.log("=== تقارير جميع الطلاب ===");
studentsList.forEach(student => {
  const avg = student.calculateAverage();
  const letter = student.getGradeLetter(avg);
  const status = student.getFinalStatus();
  
  console.log(`الاسم: ${student.name} | المتوسط: ${avg.toFixed(2)} | التقدير: ${letter} | النتيجة: ${status}`);
});

console.log("\n=== الطلاب الذين شملتهم الرأفة (قبل الإضافة) ===");
console.log(strugglingStudents);

console.log("\n=== متوسط درجات الطلاب المتعثرين بعد إضافة درجات الرأفة ===");
console.log(`المتوسط العام للمتعثرين بعد الرأفة: ${averageStruggling.toFixed(2)}`);