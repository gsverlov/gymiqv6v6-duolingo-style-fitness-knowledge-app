import type { StaticQuestion } from '../types';

// Helper to build lesson IDs matching the SQL seed
const L = (n: number): string =>
  `22000${String(n).padStart(3, '0')}-0000-0000-0000-000000000000`;

// Helper to build question IDs
const Q = (n: number): string =>
  `33000${String(n).padStart(3, '0')}-0000-0000-0000-000000000000`;

// Helper to build choice IDs (sequential global numbering)
const C = (n: number): string =>
  `44${String(n).padStart(6, '0')}-0000-0000-0000-000000000000`;

export const STATIC_QUESTIONS: StaticQuestion[] = [
  // UNIT 1 — Intro to Training

  // L01: Q1-Q4
  {
    id: Q(1),
    lesson_id: L(1),
    type: 'multiple_choice',
    question_text: 'What is the primary purpose of resistance training?',
    image_url: null,
    correct_answer: 'Build muscle strength and size',
    explanation:
      'Resistance training uses external load to stress muscles, causing them to adapt by growing stronger and larger through a process called hypertrophy.',
    sort_order: 1,
    choices: [
      { id: C(1), question_id: Q(1), label: 'Build muscle strength and size', is_correct: true, sort_order: 1 },
      { id: C(2), question_id: Q(1), label: 'Improve cardiovascular endurance', is_correct: false, sort_order: 2 },
      { id: C(3), question_id: Q(1), label: 'Increase flexibility only', is_correct: false, sort_order: 3 },
      { id: C(4), question_id: Q(1), label: 'Reduce cortisol levels', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(2),
    lesson_id: L(1),
    type: 'true_false',
    question_text: 'Resistance training can only be done with free weights.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Resistance training can use free weights, machines, resistance bands, cables, or bodyweight — any form of load that challenges the muscles.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(3),
    lesson_id: L(1),
    type: 'multiple_choice',
    question_text: 'Hypertrophy is the scientific term for:',
    image_url: null,
    correct_answer: 'Muscle fiber size increase',
    explanation:
      'Hypertrophy specifically refers to an increase in the size of muscle fibers in response to progressive overload stress during resistance training.',
    sort_order: 3,
    choices: [
      { id: C(5), question_id: Q(3), label: 'Muscle fiber size increase', is_correct: true, sort_order: 1 },
      { id: C(6), question_id: Q(3), label: 'Muscle fiber breakdown', is_correct: false, sort_order: 2 },
      { id: C(7), question_id: Q(3), label: 'Increased aerobic capacity', is_correct: false, sort_order: 3 },
      { id: C(8), question_id: Q(3), label: 'Fat cell reduction', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(4),
    lesson_id: L(1),
    type: 'fill_blank',
    question_text:
      'Resistance training causes micro-tears in muscle fibers, which repair and grow back ___ during recovery.',
    image_url: null,
    correct_answer: 'stronger',
    explanation:
      'This process — damage, repair, supercompensation — is the foundation of all strength and muscle adaptations from resistance training.',
    sort_order: 4,
    choices: [],
  },

  // L02: Q5-Q8
  {
    id: Q(5),
    lesson_id: L(2),
    type: 'multiple_choice',
    question_text: 'What is one complete movement of an exercise called?',
    image_url: null,
    correct_answer: 'A repetition (rep)',
    explanation:
      'A rep is one full execution of an exercise from start position back to start. Multiple reps performed back-to-back form a set.',
    sort_order: 1,
    choices: [
      { id: C(9), question_id: Q(5), label: 'A repetition (rep)', is_correct: true, sort_order: 1 },
      { id: C(10), question_id: Q(5), label: 'A set', is_correct: false, sort_order: 2 },
      { id: C(11), question_id: Q(5), label: 'A tempo', is_correct: false, sort_order: 3 },
      { id: C(12), question_id: Q(5), label: 'A resistance unit', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(6),
    lesson_id: L(2),
    type: 'true_false',
    question_text: 'A set is a group of consecutive repetitions performed without resting.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'A set is a series of reps done back-to-back before taking a rest break between sets.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(7),
    lesson_id: L(2),
    type: 'multiple_choice',
    question_text: 'For building muscle size (hypertrophy), the optimal rep range is:',
    image_url: null,
    correct_answer: '8–12 reps',
    explanation:
      'The 8–12 rep range creates the ideal balance of mechanical tension and metabolic stress for maximizing muscle hypertrophy.',
    sort_order: 3,
    choices: [
      { id: C(13), question_id: Q(7), label: '8–12 reps', is_correct: true, sort_order: 1 },
      { id: C(14), question_id: Q(7), label: '1–3 reps', is_correct: false, sort_order: 2 },
      { id: C(15), question_id: Q(7), label: '20–30 reps', is_correct: false, sort_order: 3 },
      { id: C(16), question_id: Q(7), label: '50+ reps', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(8),
    lesson_id: L(2),
    type: 'fill_blank',
    question_text: 'Training with very low reps (1–5) and heavy weight primarily develops muscular ___.',
    image_url: null,
    correct_answer: 'strength',
    explanation:
      'Low-rep, heavy-weight training emphasizes neural adaptations and maximal force production — the definition of strength development.',
    sort_order: 4,
    choices: [],
  },

  // L03: Q9-Q12
  {
    id: Q(9),
    lesson_id: L(3),
    type: 'multiple_choice',
    question_text: 'Progressive overload means:',
    image_url: null,
    correct_answer: 'Gradually increasing training stress over time',
    explanation:
      'Progressive overload is the gradual increase of stress placed on muscles — through more weight, reps, or sets — to keep them adapting and growing.',
    sort_order: 1,
    choices: [
      { id: C(17), question_id: Q(9), label: 'Gradually increasing training stress over time', is_correct: true, sort_order: 1 },
      { id: C(18), question_id: Q(9), label: 'Always using maximum weight each session', is_correct: false, sort_order: 2 },
      { id: C(19), question_id: Q(9), label: 'Cutting rest periods in half each week', is_correct: false, sort_order: 3 },
      { id: C(20), question_id: Q(9), label: 'Doubling training volume every month', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(10),
    lesson_id: L(3),
    type: 'true_false',
    question_text: 'You must always add more weight to the bar to achieve progressive overload.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Progressive overload can be achieved by adding reps, sets, reducing rest time, improving range of motion, or increasing exercise difficulty — not just adding weight.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(11),
    lesson_id: L(3),
    type: 'multiple_choice',
    question_text: 'The safest way to apply progressive overload as a beginner is:',
    image_url: null,
    correct_answer: 'Add 2.5–5 lbs when you complete all reps with good form',
    explanation:
      'Small, regular load increases allow continuous adaptation while keeping injury risk low. Rushing progression leads to form breakdown and injury.',
    sort_order: 3,
    choices: [
      { id: C(21), question_id: Q(11), label: 'Add 2.5–5 lbs when you complete all reps with good form', is_correct: true, sort_order: 1 },
      { id: C(22), question_id: Q(11), label: 'Add 20 lbs to each lift every session', is_correct: false, sort_order: 2 },
      { id: C(23), question_id: Q(11), label: 'Train to failure every single set', is_correct: false, sort_order: 3 },
      { id: C(24), question_id: Q(11), label: 'Use the same weight for 6 months before increasing', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(12),
    lesson_id: L(3),
    type: 'fill_blank',
    question_text: 'Without progressive overload, your body will reach a training ___ and stop adapting.',
    image_url: null,
    correct_answer: 'plateau',
    explanation:
      'Without new stimulus, the body has no reason to keep adapting. This plateau is broken by applying progressive overload principles consistently.',
    sort_order: 4,
    choices: [],
  },

  // UNIT 2 — Muscle Anatomy

  // L04: Q13-Q16
  {
    id: Q(13),
    lesson_id: L(4),
    type: 'multiple_choice',
    question_text: 'Which muscle is primarily responsible for raising the arm out to the side (shoulder abduction)?',
    image_url: null,
    correct_answer: 'Deltoid',
    explanation:
      'The lateral head of the deltoid is the prime mover for shoulder abduction. The other deltoid heads handle flexion and extension.',
    sort_order: 1,
    choices: [
      { id: C(25), question_id: Q(13), label: 'Deltoid', is_correct: true, sort_order: 1 },
      { id: C(26), question_id: Q(13), label: 'Trapezius', is_correct: false, sort_order: 2 },
      { id: C(27), question_id: Q(13), label: 'Bicep brachii', is_correct: false, sort_order: 3 },
      { id: C(28), question_id: Q(13), label: 'Pectoralis major', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(14),
    lesson_id: L(4),
    type: 'true_false',
    question_text: 'The biceps brachii has two muscle heads.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'The biceps brachii has a long head and a short head. Both originate near the shoulder, making it a multi-joint muscle involved in elbow flexion and forearm supination.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(15),
    lesson_id: L(4),
    type: 'multiple_choice',
    question_text: "The pectoralis major's primary function is:",
    image_url: null,
    correct_answer: 'Horizontal shoulder adduction and flexion',
    explanation:
      'The pec major pulls the arm across the body (adduction) and forward (flexion), which is why pressing and fly exercises effectively target it.',
    sort_order: 3,
    choices: [
      { id: C(29), question_id: Q(15), label: 'Horizontal shoulder adduction and flexion', is_correct: true, sort_order: 1 },
      { id: C(30), question_id: Q(15), label: 'Shoulder external rotation', is_correct: false, sort_order: 2 },
      { id: C(31), question_id: Q(15), label: 'Elbow extension and forearm supination', is_correct: false, sort_order: 3 },
      { id: C(32), question_id: Q(15), label: 'Spinal extension and hip flexion', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(16),
    lesson_id: L(4),
    type: 'image_match',
    question_text:
      "Which back muscle is the prime mover for pull-ups and rows — the large fan-shaped 'wing' muscle?",
    image_url: 'muscle_back_diagram.svg',
    correct_answer: 'Latissimus dorsi',
    explanation:
      'The latissimus dorsi originates from the lower back and inserts on the upper arm. It is the primary mover in all pulling exercises and gives the back its V-taper shape.',
    sort_order: 4,
    choices: [
      { id: C(33), question_id: Q(16), label: 'Latissimus dorsi', is_correct: true, sort_order: 1 },
      { id: C(34), question_id: Q(16), label: 'Trapezius', is_correct: false, sort_order: 2 },
      { id: C(35), question_id: Q(16), label: 'Rhomboid', is_correct: false, sort_order: 3 },
      { id: C(36), question_id: Q(16), label: 'Teres major', is_correct: false, sort_order: 4 },
    ],
  },

  // L05: Q17-Q20
  {
    id: Q(17),
    lesson_id: L(5),
    type: 'multiple_choice',
    question_text: 'The quadriceps group consists of how many individual muscles?',
    image_url: null,
    correct_answer: '4 muscles',
    explanation:
      'The quads are: rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius. All four converge to extend the knee via the patellar tendon.',
    sort_order: 1,
    choices: [
      { id: C(37), question_id: Q(17), label: '4 muscles', is_correct: true, sort_order: 1 },
      { id: C(38), question_id: Q(17), label: '2 muscles', is_correct: false, sort_order: 2 },
      { id: C(39), question_id: Q(17), label: '3 muscles', is_correct: false, sort_order: 3 },
      { id: C(40), question_id: Q(17), label: '6 muscles', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(18),
    lesson_id: L(5),
    type: 'true_false',
    question_text: 'The hamstrings cross both the hip and knee joints.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'Most hamstring muscles originate at the ischial tuberosity and insert below the knee, crossing both joints and enabling both hip extension and knee flexion.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(19),
    lesson_id: L(5),
    type: 'multiple_choice',
    question_text: 'Which muscle is primarily targeted by a standing calf raise?',
    image_url: null,
    correct_answer: 'Gastrocnemius',
    explanation:
      'The gastrocnemius is the large visible calf muscle best targeted by standing raises. The soleus is better targeted seated due to the bent-knee position.',
    sort_order: 3,
    choices: [
      { id: C(41), question_id: Q(19), label: 'Gastrocnemius', is_correct: true, sort_order: 1 },
      { id: C(42), question_id: Q(19), label: 'Soleus', is_correct: false, sort_order: 2 },
      { id: C(43), question_id: Q(19), label: 'Tibialis anterior', is_correct: false, sort_order: 3 },
      { id: C(44), question_id: Q(19), label: 'Peroneus longus', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(20),
    lesson_id: L(5),
    type: 'fill_blank',
    question_text: 'The gluteus ___ is the largest muscle in the human body.',
    image_url: null,
    correct_answer: 'maximus',
    explanation:
      "The gluteus maximus is the body's largest muscle, primarily responsible for hip extension and external rotation — essential for squats, deadlifts, and running.",
    sort_order: 4,
    choices: [],
  },

  // L06: Q21-Q24
  {
    id: Q(21),
    lesson_id: L(6),
    type: 'multiple_choice',
    question_text: 'The core is best described as:',
    image_url: null,
    correct_answer: 'Muscles around the spine and pelvis providing stability',
    explanation:
      'The core includes rectus abdominis, transverse abdominis, obliques, multifidus, and erector spinae — working together as a stability system, not just the abs.',
    sort_order: 1,
    choices: [
      { id: C(45), question_id: Q(21), label: 'Muscles around the spine and pelvis providing stability', is_correct: true, sort_order: 1 },
      { id: C(46), question_id: Q(21), label: 'Only the visible six-pack muscles', is_correct: false, sort_order: 2 },
      { id: C(47), question_id: Q(21), label: 'Exclusively the lower back muscles', is_correct: false, sort_order: 3 },
      { id: C(48), question_id: Q(21), label: 'The hip flexors and extensors only', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(22),
    lesson_id: L(6),
    type: 'true_false',
    question_text: 'Doing thousands of sit-ups is the most effective way to get visible abs.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Visible abs require low body fat. You can have strong abs hidden under fat. Diet and caloric balance matter far more than ab exercises for abdominal visibility.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(23),
    lesson_id: L(6),
    type: 'multiple_choice',
    question_text: "Which deep core muscle acts as the body's natural weight belt?",
    image_url: null,
    correct_answer: 'Transverse abdominis',
    explanation:
      'The transverse abdominis wraps around the spine like a corset, creating intra-abdominal pressure that stabilizes the spine during heavy compound lifts.',
    sort_order: 3,
    choices: [
      { id: C(49), question_id: Q(23), label: 'Transverse abdominis', is_correct: true, sort_order: 1 },
      { id: C(50), question_id: Q(23), label: 'Rectus abdominis', is_correct: false, sort_order: 2 },
      { id: C(51), question_id: Q(23), label: 'External oblique', is_correct: false, sort_order: 3 },
      { id: C(52), question_id: Q(23), label: 'Iliopsoas', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(24),
    lesson_id: L(6),
    type: 'fill_blank',
    question_text: 'Bracing your core means creating ___ pressure in the abdomen to protect the spine.',
    image_url: null,
    correct_answer: 'intra-abdominal',
    explanation:
      'Intra-abdominal pressure, created by breathing in and bracing, provides critical spinal stability during heavy compound movements like squats and deadlifts.',
    sort_order: 4,
    choices: [],
  },

  // L07: Q25-Q28
  {
    id: Q(25),
    lesson_id: L(7),
    type: 'multiple_choice',
    question_text: 'Type I (slow-twitch) muscle fibers are characterized by:',
    image_url: null,
    correct_answer: 'High endurance, low force output',
    explanation:
      'Type I fibers are fatigue-resistant, rich in mitochondria, and used for endurance activities. They produce less force but sustain effort for long periods.',
    sort_order: 1,
    choices: [
      { id: C(53), question_id: Q(25), label: 'High endurance, low force output', is_correct: true, sort_order: 1 },
      { id: C(54), question_id: Q(25), label: 'Low endurance, high explosive force', is_correct: false, sort_order: 2 },
      { id: C(55), question_id: Q(25), label: 'Moderate endurance, moderate force', is_correct: false, sort_order: 3 },
      { id: C(56), question_id: Q(25), label: 'Used exclusively for maximum strength efforts', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(26),
    lesson_id: L(7),
    type: 'true_false',
    question_text: 'Type II (fast-twitch) muscle fibers fatigue more slowly than Type I fibers.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Type II fibers fatigue quickly but generate much more force. Type I fibers are the fatigue-resistant, endurance-oriented fibers.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(27),
    lesson_id: L(7),
    type: 'multiple_choice',
    question_text: 'Which type of training best recruits fast-twitch (Type II) muscle fibers?',
    image_url: null,
    correct_answer: 'Heavy lifting and explosive power movements',
    explanation:
      'Type II fibers are recruited for high-intensity, short-duration efforts like maximal lifting, sprinting, and explosive power movements.',
    sort_order: 3,
    choices: [
      { id: C(57), question_id: Q(27), label: 'Heavy lifting and explosive power movements', is_correct: true, sort_order: 1 },
      { id: C(58), question_id: Q(27), label: 'Long-distance running at easy pace', is_correct: false, sort_order: 2 },
      { id: C(59), question_id: Q(27), label: 'Yoga and static stretching', is_correct: false, sort_order: 3 },
      { id: C(60), question_id: Q(27), label: 'Light resistance for sets of 30+ reps', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(28),
    lesson_id: L(7),
    type: 'fill_blank',
    question_text: 'The ratio of slow-twitch to fast-twitch muscle fibers is largely determined by ___.',
    image_url: null,
    correct_answer: 'genetics',
    explanation:
      'While training can influence fiber type characteristics, the basic ratio of Type I to Type II fibers is largely genetically predetermined and varies significantly between individuals.',
    sort_order: 4,
    choices: [],
  },

  // UNIT 3 — Exercise Form

  // L08: Q29-Q32
  {
    id: Q(29),
    lesson_id: L(8),
    type: 'multiple_choice',
    question_text: 'During a squat, the knees should:',
    image_url: null,
    correct_answer: 'Track over the toes throughout the movement',
    explanation:
      'Allowing the knees to track in line with the toes ensures proper force distribution and reduces knee stress. Caving inward (valgus) increases injury risk.',
    sort_order: 1,
    choices: [
      { id: C(61), question_id: Q(29), label: 'Track over the toes throughout the movement', is_correct: true, sort_order: 1 },
      { id: C(62), question_id: Q(29), label: 'Cave inward for greater depth', is_correct: false, sort_order: 2 },
      { id: C(63), question_id: Q(29), label: 'Stay completely stationary', is_correct: false, sort_order: 3 },
      { id: C(64), question_id: Q(29), label: 'Always stay behind the toes regardless of depth', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(30),
    lesson_id: L(8),
    type: 'true_false',
    question_text: 'Your heels should stay flat on the floor throughout the squat.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'Keeping heels flat ensures proper weight distribution and maximizes power. If heels rise, limited ankle mobility is usually the cause and should be addressed.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(31),
    lesson_id: L(8),
    type: 'multiple_choice',
    question_text: 'The primary muscles targeted in a back squat are:',
    image_url: null,
    correct_answer: 'Quadriceps, glutes, and hamstrings',
    explanation:
      'The squat is a lower-body compound movement. Quads extend the knee while glutes and hamstrings drive hip extension. The erector spinae stabilize the spine.',
    sort_order: 3,
    choices: [
      { id: C(65), question_id: Q(31), label: 'Quadriceps, glutes, and hamstrings', is_correct: true, sort_order: 1 },
      { id: C(66), question_id: Q(31), label: 'Chest, shoulders, and triceps', is_correct: false, sort_order: 2 },
      { id: C(67), question_id: Q(31), label: 'Biceps, forearms, and lats', is_correct: false, sort_order: 3 },
      { id: C(68), question_id: Q(31), label: 'Calves and hip flexors exclusively', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(32),
    lesson_id: L(8),
    type: 'fill_blank',
    question_text:
      'Maintaining a ___ spine position during the squat protects the vertebral discs from excessive load.',
    image_url: null,
    correct_answer: 'neutral',
    explanation:
      'A neutral spine — preserving the natural lumbar curve without excessive rounding or hyperextension — distributes spinal load safely throughout the squat.',
    sort_order: 4,
    choices: [],
  },

  // L09: Q33-Q36
  {
    id: Q(33),
    lesson_id: L(9),
    type: 'multiple_choice',
    question_text: 'In the deadlift setup, the barbell should be positioned:',
    image_url: null,
    correct_answer: 'Over the mid-foot',
    explanation:
      'The bar should be over mid-foot in setup. When you hinge to grip it, the bar comes to your shins, then stays close to the body throughout the lift.',
    sort_order: 1,
    choices: [
      { id: C(69), question_id: Q(33), label: 'Over the mid-foot', is_correct: true, sort_order: 1 },
      { id: C(70), question_id: Q(33), label: 'Pressed against the shins before lifting', is_correct: false, sort_order: 2 },
      { id: C(71), question_id: Q(33), label: 'About 12 inches in front of your feet', is_correct: false, sort_order: 3 },
      { id: C(72), question_id: Q(33), label: 'Directly below your shoulder joint', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(34),
    lesson_id: L(9),
    type: 'true_false',
    question_text: 'Rounding your lower back during a deadlift increases your range of motion safely.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Lumbar rounding during a deadlift significantly increases injury risk to spinal discs. A neutral spine with braced core is essential for safe and effective deadlifting.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(35),
    lesson_id: L(9),
    type: 'multiple_choice',
    question_text: "The deadlift is called a 'hip hinge' because:",
    image_url: null,
    correct_answer: 'The primary movement is hip extension, driving hips forward',
    explanation:
      'The deadlift starts with hip hinging backward and is completed by driving hips forward into extension. Glutes and hamstrings are the prime movers.',
    sort_order: 3,
    choices: [
      { id: C(73), question_id: Q(35), label: 'The primary movement is hip extension, driving hips forward', is_correct: true, sort_order: 1 },
      { id: C(74), question_id: Q(35), label: 'The hips move laterally during the lift', is_correct: false, sort_order: 2 },
      { id: C(75), question_id: Q(35), label: 'You must externally rotate the hips outward', is_correct: false, sort_order: 3 },
      { id: C(76), question_id: Q(35), label: 'The hip flexors are the primary movers', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(36),
    lesson_id: L(9),
    type: 'fill_blank',
    question_text:
      'The Romanian Deadlift differs from the conventional deadlift in that the knees remain nearly ___ throughout.',
    image_url: null,
    correct_answer: 'straight',
    explanation:
      'The RDL isolates hamstrings and glutes more effectively by keeping knees mostly straight, maximizing the hip hinge and hamstring stretch under load.',
    sort_order: 4,
    choices: [],
  },

  // L10: Q37-Q40
  {
    id: Q(37),
    lesson_id: L(10),
    type: 'multiple_choice',
    question_text: 'The proper grip width for a standard barbell bench press is:',
    image_url: null,
    correct_answer: 'Slightly wider than shoulder-width',
    explanation:
      'A slightly wider than shoulder-width grip creates ~90-degree elbow angle at the bottom, maximizing pec activation while protecting shoulder health.',
    sort_order: 1,
    choices: [
      { id: C(77), question_id: Q(37), label: 'Slightly wider than shoulder-width', is_correct: true, sort_order: 1 },
      { id: C(78), question_id: Q(37), label: 'As wide as the collars allow', is_correct: false, sort_order: 2 },
      { id: C(79), question_id: Q(37), label: 'Hands touching in the center of the bar', is_correct: false, sort_order: 3 },
      { id: C(80), question_id: Q(37), label: 'Exactly shoulder-width apart', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(38),
    lesson_id: L(10),
    type: 'true_false',
    question_text: 'The barbell should touch your chest at the bottom of the bench press.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'Full range of motion means touching the bar to the lower chest/sternum area. This maximizes muscle stretch, activation, and long-term strength development.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(39),
    lesson_id: L(10),
    type: 'multiple_choice',
    question_text: 'Retracting your shoulder blades during the bench press primarily:',
    image_url: null,
    correct_answer: 'Creates a stable base and protects the shoulder joint',
    explanation:
      "Scapular retraction and depression creates a stable 'shelf' for the upper back, reduces shoulder joint stress, and allows safer, stronger pressing mechanics.",
    sort_order: 3,
    choices: [
      { id: C(81), question_id: Q(39), label: 'Creates a stable base and protects the shoulder joint', is_correct: true, sort_order: 1 },
      { id: C(82), question_id: Q(39), label: 'Increases your range of motion significantly', is_correct: false, sort_order: 2 },
      { id: C(83), question_id: Q(39), label: 'Shifts the load entirely to the triceps', is_correct: false, sort_order: 3 },
      { id: C(84), question_id: Q(39), label: 'Allows you to arch the back more aggressively', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(40),
    lesson_id: L(10),
    type: 'fill_blank',
    question_text:
      'During the bench press, the bar should travel in a slight ___ path — lower at the bottom and higher at lockout.',
    image_url: null,
    correct_answer: 'diagonal',
    explanation:
      'The diagonal bar path follows the natural arc of the chest muscles and keeps the bar over the elbow joint, maximizing mechanical advantage throughout the press.',
    sort_order: 4,
    choices: [],
  },

  // L11: Q41-Q44
  {
    id: Q(41),
    lesson_id: L(11),
    type: 'multiple_choice',
    question_text: 'Pull-ups primarily target which muscle?',
    image_url: null,
    correct_answer: 'Latissimus dorsi',
    explanation:
      'The lats are the prime mover in pull-ups — pulling the upper arm toward the body (shoulder adduction and extension). Biceps and rear delts assist as secondary movers.',
    sort_order: 1,
    choices: [
      { id: C(85), question_id: Q(41), label: 'Latissimus dorsi', is_correct: true, sort_order: 1 },
      { id: C(86), question_id: Q(41), label: 'Biceps brachii', is_correct: false, sort_order: 2 },
      { id: C(87), question_id: Q(41), label: 'Rhomboids', is_correct: false, sort_order: 3 },
      { id: C(88), question_id: Q(41), label: 'Posterior deltoid', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(42),
    lesson_id: L(11),
    type: 'true_false',
    question_text: 'A chin-up (palms facing you) involves more bicep activation than a standard pull-up.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'The supinated (underhand) grip in a chin-up places the biceps in a mechanically stronger position, increasing their contribution compared to the pronated pull-up grip.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(43),
    lesson_id: L(11),
    type: 'multiple_choice',
    question_text: 'During a row, you should initiate the movement by:',
    image_url: null,
    correct_answer: 'Retracting the shoulder blade before bending the elbow',
    explanation:
      'Initiating rows with scapular retraction ensures lats and rhomboids do the work. If you pull with the arm first, biceps dominate and back muscles are undertrained.',
    sort_order: 3,
    choices: [
      { id: C(89), question_id: Q(43), label: 'Retracting the shoulder blade before bending the elbow', is_correct: true, sort_order: 1 },
      { id: C(90), question_id: Q(43), label: 'Curling the weight up with the bicep first', is_correct: false, sort_order: 2 },
      { id: C(91), question_id: Q(43), label: 'Extending the spine backward to assist', is_correct: false, sort_order: 3 },
      { id: C(92), question_id: Q(43), label: 'Rotating the torso toward the working arm', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(44),
    lesson_id: L(11),
    type: 'fill_blank',
    question_text:
      'To maximize lat engagement during rows and pull-ups, focus on driving your elbows ___ your torso.',
    image_url: null,
    correct_answer: 'into',
    explanation:
      'Visualizing driving elbows into your sides (rather than curling with biceps) activates the lats more effectively during all pulling exercises.',
    sort_order: 4,
    choices: [],
  },

  // UNIT 4 — Nutrition Basics

  // L12: Q45-Q48
  {
    id: Q(45),
    lesson_id: L(12),
    type: 'multiple_choice',
    question_text: 'The three macronutrients are:',
    image_url: null,
    correct_answer: 'Protein, carbohydrates, and fats',
    explanation:
      'The three macronutrients provide energy and serve distinct physiological roles. Protein builds tissue, carbs fuel activity, and fats support hormones and cell membranes.',
    sort_order: 1,
    choices: [
      { id: C(93), question_id: Q(45), label: 'Protein, carbohydrates, and fats', is_correct: true, sort_order: 1 },
      { id: C(94), question_id: Q(45), label: 'Vitamins, minerals, and water', is_correct: false, sort_order: 2 },
      { id: C(95), question_id: Q(45), label: 'Glucose, amino acids, and fatty acids', is_correct: false, sort_order: 3 },
      { id: C(96), question_id: Q(45), label: 'Fiber, sodium, and potassium', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(46),
    lesson_id: L(12),
    type: 'true_false',
    question_text: 'All three macronutrients provide 4 calories per gram.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Protein and carbohydrates provide 4 calories per gram. Fat provides 9 calories per gram — more than twice as much, making it the most calorie-dense macronutrient.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(47),
    lesson_id: L(12),
    type: 'multiple_choice',
    question_text: "The body's preferred immediate fuel source for high-intensity exercise is:",
    image_url: null,
    correct_answer: 'Carbohydrates',
    explanation:
      "Carbohydrates break down into glucose, the body's primary fuel for high-intensity exercise and the brain's preferred energy source.",
    sort_order: 3,
    choices: [
      { id: C(97), question_id: Q(47), label: 'Carbohydrates', is_correct: true, sort_order: 1 },
      { id: C(98), question_id: Q(47), label: 'Dietary protein', is_correct: false, sort_order: 2 },
      { id: C(99), question_id: Q(47), label: 'Stored body fat', is_correct: false, sort_order: 3 },
      { id: C(100), question_id: Q(47), label: 'Dietary fiber', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(48),
    lesson_id: L(12),
    type: 'fill_blank',
    question_text:
      'Fat provides ___ calories per gram — more than double that of protein or carbohydrates.',
    image_url: null,
    correct_answer: '9',
    explanation:
      "Fat's 9 kcal/g density makes it the most energy-dense macronutrient. This is why high-fat foods are calorie-dense and portion control matters when tracking intake.",
    sort_order: 4,
    choices: [],
  },

  // L13: Q49-Q52
  {
    id: Q(49),
    lesson_id: L(13),
    type: 'multiple_choice',
    question_text: 'The recommended daily protein intake for maximizing muscle growth is approximately:',
    image_url: null,
    correct_answer: '1.6–2.2 grams per kilogram of bodyweight',
    explanation:
      'Research consistently shows that 1.6–2.2g/kg/day is the effective range for maximizing muscle protein synthesis. Consuming more provides minimal additional benefit.',
    sort_order: 1,
    choices: [
      { id: C(101), question_id: Q(49), label: '1.6–2.2 grams per kilogram of bodyweight', is_correct: true, sort_order: 1 },
      { id: C(102), question_id: Q(49), label: '0.5 grams per kilogram of bodyweight', is_correct: false, sort_order: 2 },
      { id: C(103), question_id: Q(49), label: '5 grams per kilogram of bodyweight', is_correct: false, sort_order: 3 },
      { id: C(104), question_id: Q(49), label: '3.5 grams per pound of bodyweight', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(50),
    lesson_id: L(13),
    type: 'true_false',
    question_text: 'The body can fully utilize an unlimited amount of protein consumed in a single meal.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'The body can use approximately 20–40g of protein per meal for muscle protein synthesis. Excess protein above this is used for energy or other metabolic processes.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(51),
    lesson_id: L(13),
    type: 'multiple_choice',
    question_text: "Which protein source is considered 'complete,' containing all essential amino acids?",
    image_url: null,
    correct_answer: 'Animal proteins like meat, eggs, and dairy',
    explanation:
      'Complete proteins contain all 9 essential amino acids in adequate ratios. Most animal proteins are complete. Most plant proteins lack one or more EAAs.',
    sort_order: 3,
    choices: [
      { id: C(105), question_id: Q(51), label: 'Animal proteins like meat, eggs, and dairy', is_correct: true, sort_order: 1 },
      { id: C(106), question_id: Q(51), label: 'Rice protein eaten alone', is_correct: false, sort_order: 2 },
      { id: C(107), question_id: Q(51), label: 'Plant proteins when eaten separately', is_correct: false, sort_order: 3 },
      { id: C(108), question_id: Q(51), label: 'Only whey protein isolate powder', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(52),
    lesson_id: L(13),
    type: 'fill_blank',
    question_text:
      'The amino acid ___ acts as the key trigger for muscle protein synthesis via the mTOR pathway.',
    image_url: null,
    correct_answer: 'leucine',
    explanation:
      'Leucine is the primary amino acid responsible for activating muscle protein synthesis. Meals need 2–3g of leucine to fully stimulate MPS — found in about 30g of quality protein.',
    sort_order: 4,
    choices: [],
  },

  // L14: Q53-Q56
  {
    id: Q(53),
    lesson_id: L(14),
    type: 'multiple_choice',
    question_text: 'Glycogen is:',
    image_url: null,
    correct_answer: 'Stored carbohydrate in muscles and liver',
    explanation:
      'Glycogen is the stored form of glucose. Muscle glycogen is the primary fuel for high-intensity training. Liver glycogen maintains blood glucose between meals.',
    sort_order: 1,
    choices: [
      { id: C(109), question_id: Q(53), label: 'Stored carbohydrate in muscles and liver', is_correct: true, sort_order: 1 },
      { id: C(110), question_id: Q(53), label: 'A type of fat stored in adipose tissue', is_correct: false, sort_order: 2 },
      { id: C(111), question_id: Q(53), label: 'A digestive enzyme that breaks down sugars', is_correct: false, sort_order: 3 },
      { id: C(112), question_id: Q(53), label: 'The form of sugar circulating in the blood', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(54),
    lesson_id: L(14),
    type: 'true_false',
    question_text: 'Eating carbohydrates before a workout can improve high-intensity performance.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'Pre-workout carbohydrates top off glycogen stores and provide readily available glucose, improving energy availability and performance during intense training.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(55),
    lesson_id: L(14),
    type: 'multiple_choice',
    question_text: 'Which type of carbohydrate provides more sustained, steady energy?',
    image_url: null,
    correct_answer: 'Complex carbs like oats and sweet potato',
    explanation:
      'Complex carbs have longer molecular chains, digest slower, and provide steadier energy. Simple sugars cause rapid glucose spikes followed by energy crashes.',
    sort_order: 3,
    choices: [
      { id: C(113), question_id: Q(55), label: 'Complex carbs like oats and sweet potato', is_correct: true, sort_order: 1 },
      { id: C(114), question_id: Q(55), label: 'Simple sugars like candy and soda', is_correct: false, sort_order: 2 },
      { id: C(115), question_id: Q(55), label: 'Both provide identical sustained energy levels', is_correct: false, sort_order: 3 },
      { id: C(116), question_id: Q(55), label: 'Refined white bread and pasta', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(56),
    lesson_id: L(14),
    type: 'fill_blank',
    question_text:
      'Muscle glycogen is depleted during intense exercise and replenished by consuming ___ after training.',
    image_url: null,
    correct_answer: 'carbohydrates',
    explanation:
      'Post-workout carbohydrate intake replenishes muscle glycogen stores, restoring energy for subsequent training sessions and supporting overall recovery.',
    sort_order: 4,
    choices: [],
  },

  // L15: Q57-Q60
  {
    id: Q(57),
    lesson_id: L(15),
    type: 'multiple_choice',
    question_text: 'Which type of fat is most associated with reduced cardiovascular disease risk?',
    image_url: null,
    correct_answer: 'Monounsaturated fats (olive oil, avocados)',
    explanation:
      'Monounsaturated fats reduce LDL (bad) cholesterol while maintaining HDL (good) cholesterol. The Mediterranean diet, rich in these fats, is associated with excellent heart health.',
    sort_order: 1,
    choices: [
      { id: C(117), question_id: Q(57), label: 'Monounsaturated fats (olive oil, avocados)', is_correct: true, sort_order: 1 },
      { id: C(118), question_id: Q(57), label: 'Trans fats from partially hydrogenated oils', is_correct: false, sort_order: 2 },
      { id: C(119), question_id: Q(57), label: 'Saturated fats from butter and red meat', is_correct: false, sort_order: 3 },
      { id: C(120), question_id: Q(57), label: 'Processed vegetable shortening', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(58),
    lesson_id: L(15),
    type: 'true_false',
    question_text: 'Dietary fat is essential for producing hormones including testosterone.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'Fats are essential for producing steroid hormones including testosterone, estrogen, and cortisol. Very low-fat diets impair hormone production and can reduce testosterone levels.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(59),
    lesson_id: L(15),
    type: 'multiple_choice',
    question_text: 'Trans fats are harmful primarily because they:',
    image_url: null,
    correct_answer: 'Raise LDL cholesterol and lower HDL cholesterol simultaneously',
    explanation:
      'Trans fats have a uniquely damaging lipid effect — they raise bad LDL and lower good HDL simultaneously, significantly increasing cardiovascular disease risk.',
    sort_order: 3,
    choices: [
      { id: C(121), question_id: Q(59), label: 'Raise LDL cholesterol and lower HDL cholesterol simultaneously', is_correct: true, sort_order: 1 },
      { id: C(122), question_id: Q(59), label: 'Are directly converted to stored body fat', is_correct: false, sort_order: 2 },
      { id: C(123), question_id: Q(59), label: 'Slow the digestion of dietary protein', is_correct: false, sort_order: 3 },
      { id: C(124), question_id: Q(59), label: 'Significantly increase water retention', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(60),
    lesson_id: L(15),
    type: 'fill_blank',
    question_text:
      'Omega-___ fatty acids, found in fatty fish and flaxseed, are essential for reducing inflammation.',
    image_url: null,
    correct_answer: '3',
    explanation:
      'Omega-3 fatty acids (EPA and DHA) are essential, anti-inflammatory fats the body cannot synthesize. They support brain function, cardiovascular health, and muscle recovery.',
    sort_order: 4,
    choices: [],
  },

  // UNIT 5 — Programming

  // L16: Q61-Q64
  {
    id: Q(61),
    lesson_id: L(16),
    type: 'multiple_choice',
    question_text: 'For natural lifters, the optimal training frequency per muscle group per week is:',
    image_url: null,
    correct_answer: '2 times per week',
    explanation:
      'Research consistently shows that 2x per week per muscle group is optimal for most natural lifters, providing adequate stimulus while allowing sufficient recovery.',
    sort_order: 1,
    choices: [
      { id: C(125), question_id: Q(61), label: '2 times per week', is_correct: true, sort_order: 1 },
      { id: C(126), question_id: Q(61), label: 'Every day (7 times per week)', is_correct: false, sort_order: 2 },
      { id: C(127), question_id: Q(61), label: 'Once per week maximum', is_correct: false, sort_order: 3 },
      { id: C(128), question_id: Q(61), label: '5–6 times per week minimum', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(62),
    lesson_id: L(16),
    type: 'true_false',
    question_text: 'Training a muscle more frequently always leads to greater muscle growth.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Training frequency beyond recovery capacity leads to accumulated fatigue and overtraining. More is only better up to the threshold where adequate recovery remains possible.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(63),
    lesson_id: L(16),
    type: 'multiple_choice',
    question_text: 'Which factor most influences how quickly a muscle recovers between sessions?',
    image_url: null,
    correct_answer: 'Volume and intensity of the previous training session',
    explanation:
      'Recovery time is primarily dictated by how much muscular damage and systemic fatigue was accumulated. Higher volume and intensity = longer recovery requirement.',
    sort_order: 3,
    choices: [
      { id: C(129), question_id: Q(63), label: 'Volume and intensity of the previous training session', is_correct: true, sort_order: 1 },
      { id: C(130), question_id: Q(63), label: 'The time of day you trained', is_correct: false, sort_order: 2 },
      { id: C(131), question_id: Q(63), label: 'Whether you listened to music during training', is_correct: false, sort_order: 3 },
      { id: C(132), question_id: Q(63), label: 'The ambient temperature of the gym', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(64),
    lesson_id: L(16),
    type: 'fill_blank',
    question_text:
      'Research suggests the minimum effective training volume for hypertrophy is approximately ___ sets per muscle group per week.',
    image_url: null,
    correct_answer: '10',
    explanation:
      '10–20 sets per muscle per week is the effective hypertrophy range. Below 10 sets, stimulus is often insufficient. Individual responses vary based on training history.',
    sort_order: 4,
    choices: [],
  },

  // L17: Q65-Q68
  {
    id: Q(65),
    lesson_id: L(17),
    type: 'multiple_choice',
    question_text: 'A Push/Pull/Legs (PPL) split organizes training by:',
    image_url: null,
    correct_answer: 'Movement pattern — pushing, pulling, and leg exercises',
    explanation:
      'PPL groups exercises by movement pattern: push (chest/shoulders/triceps), pull (back/biceps), and legs (quads/hamstrings/glutes).',
    sort_order: 1,
    choices: [
      { id: C(133), question_id: Q(65), label: 'Movement pattern — pushing, pulling, and leg exercises', is_correct: true, sort_order: 1 },
      { id: C(134), question_id: Q(65), label: 'Muscle size — large, medium, and small groups', is_correct: false, sort_order: 2 },
      { id: C(135), question_id: Q(65), label: 'Workout duration — short, medium, and long', is_correct: false, sort_order: 3 },
      { id: C(136), question_id: Q(65), label: 'Intensity — low, moderate, and high', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(66),
    lesson_id: L(17),
    type: 'true_false',
    question_text: 'A full-body workout 3 times per week is a valid and effective training approach.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'Full-body training 3x per week hits each muscle group twice to three times weekly, is time-efficient, and is especially effective for beginners and intermediate lifters.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(67),
    lesson_id: L(17),
    type: 'multiple_choice',
    question_text: "A traditional 'bro split' typically involves:",
    image_url: null,
    correct_answer: 'Training one muscle group per day, 5–6 days per week',
    explanation:
      'Bro splits dedicate each day to a single muscle group (e.g., chest Monday, back Tuesday), which limits weekly training frequency per muscle to just once.',
    sort_order: 3,
    choices: [
      { id: C(137), question_id: Q(67), label: 'Training one muscle group per day, 5–6 days per week', is_correct: true, sort_order: 1 },
      { id: C(138), question_id: Q(67), label: 'Doing the exact same workout every day', is_correct: false, sort_order: 2 },
      { id: C(139), question_id: Q(67), label: 'Only training the major compound lifts', is_correct: false, sort_order: 3 },
      { id: C(140), question_id: Q(67), label: 'Training 2 muscle groups per session for 7 days', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(68),
    lesson_id: L(17),
    type: 'fill_blank',
    question_text:
      'In an upper/lower split, each upper and lower body session is performed ___ times per week.',
    image_url: null,
    correct_answer: '2',
    explanation:
      'A standard upper/lower split alternates upper and lower body across 4 days (2 upper + 2 lower), providing twice-weekly frequency for all major muscle groups.',
    sort_order: 4,
    choices: [],
  },

  // L18: Q69-Q72
  {
    id: Q(69),
    lesson_id: L(18),
    type: 'multiple_choice',
    question_text: 'Periodization refers to:',
    image_url: null,
    correct_answer: 'Systematically varying training variables over time to maximize adaptation',
    explanation:
      'Periodization is the planned manipulation of volume, intensity, and frequency over weeks and months to prevent plateaus and optimize long-term gains.',
    sort_order: 1,
    choices: [
      { id: C(141), question_id: Q(69), label: 'Systematically varying training variables over time to maximize adaptation', is_correct: true, sort_order: 1 },
      { id: C(142), question_id: Q(69), label: 'The timing of meals around your workouts', is_correct: false, sort_order: 2 },
      { id: C(143), question_id: Q(69), label: 'The rest periods between individual sets', is_correct: false, sort_order: 3 },
      { id: C(144), question_id: Q(69), label: 'Tracking the total duration of each workout', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(70),
    lesson_id: L(18),
    type: 'true_false',
    question_text: 'Linear periodization involves adding weight to the bar every single training session.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'Linear periodization (linear progression) adds small weight increments each session — typically used by beginners who recover fast enough to progress every workout.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(71),
    lesson_id: L(18),
    type: 'multiple_choice',
    question_text: "A 'deload week' in a training program means:",
    image_url: null,
    correct_answer: 'Temporarily reducing volume or intensity to dissipate accumulated fatigue',
    explanation:
      'A deload involves reducing volume by 40–50% while maintaining exercise selection and moderate intensity, allowing full fatigue dissipation while retaining fitness.',
    sort_order: 3,
    choices: [
      { id: C(145), question_id: Q(71), label: 'Temporarily reducing volume or intensity to dissipate accumulated fatigue', is_correct: true, sort_order: 1 },
      { id: C(146), question_id: Q(71), label: 'Quitting training entirely for a full month', is_correct: false, sort_order: 2 },
      { id: C(147), question_id: Q(71), label: 'Training at maximum intensity every session', is_correct: false, sort_order: 3 },
      { id: C(148), question_id: Q(71), label: 'Switching to exclusively cardio-based training', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(72),
    lesson_id: L(18),
    type: 'fill_blank',
    question_text:
      'The three primary training variables manipulated in periodization are volume, intensity, and ___.',
    image_url: null,
    correct_answer: 'frequency',
    explanation:
      'Periodization systematically manipulates volume (sets x reps), intensity (% of 1RM), and frequency (sessions per week/muscle) in planned waves to optimize adaptation.',
    sort_order: 4,
    choices: [],
  },

  // UNIT 6 — Recovery

  // L19: Q73-Q76
  {
    id: Q(73),
    lesson_id: L(19),
    type: 'multiple_choice',
    question_text: 'When does the majority of muscle repair and growth occur?',
    image_url: null,
    correct_answer: 'During deep sleep',
    explanation:
      'Growth hormone is primarily secreted during deep (slow-wave) sleep. Muscle protein synthesis also peaks during sleep, making 7–9 hours of quality sleep critical for gains.',
    sort_order: 1,
    choices: [
      { id: C(149), question_id: Q(73), label: 'During deep sleep', is_correct: true, sort_order: 1 },
      { id: C(150), question_id: Q(73), label: 'Immediately after the workout ends', is_correct: false, sort_order: 2 },
      { id: C(151), question_id: Q(73), label: 'During the workout itself under load', is_correct: false, sort_order: 3 },
      { id: C(152), question_id: Q(73), label: 'While sitting or standing at rest during the day', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(74),
    lesson_id: L(19),
    type: 'true_false',
    question_text: '5 hours of sleep per night is sufficient for optimal muscle growth and recovery.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Research recommends 7–9 hours for adults. Less than 7 hours impairs GH release, reduces testosterone, increases cortisol, and significantly slows muscle recovery.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(75),
    lesson_id: L(19),
    type: 'multiple_choice',
    question_text: 'Chronically sleeping less than 6 hours per night is associated with:',
    image_url: null,
    correct_answer: 'Reduced testosterone, impaired recovery, and increased fat gain',
    explanation:
      'Chronic sleep deprivation dramatically impairs anabolic hormone production, reduces muscle protein synthesis, elevates cortisol, and increases fat storage and hunger hormones.',
    sort_order: 3,
    choices: [
      { id: C(153), question_id: Q(75), label: 'Reduced testosterone, impaired recovery, and increased fat gain', is_correct: true, sort_order: 1 },
      { id: C(154), question_id: Q(75), label: 'Improved muscle endurance and work capacity', is_correct: false, sort_order: 2 },
      { id: C(155), question_id: Q(75), label: 'Enhanced fat burning during exercise', is_correct: false, sort_order: 3 },
      { id: C(156), question_id: Q(75), label: 'Faster recovery through sleep deprivation adaptation', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(76),
    lesson_id: L(19),
    type: 'fill_blank',
    question_text: 'The sleep stage when most growth hormone is released is called ___ sleep.',
    image_url: null,
    correct_answer: 'deep',
    explanation:
      'Deep sleep (slow-wave sleep, stages 3–4) is when the pituitary releases most daily growth hormone — essential for muscle repair, fat metabolism, and immune function.',
    sort_order: 4,
    choices: [],
  },

  // L20: Q77-Q80
  {
    id: Q(77),
    lesson_id: L(20),
    type: 'multiple_choice',
    question_text: 'Active recovery refers to:',
    image_url: null,
    correct_answer: 'Light, low-intensity movement to enhance blood flow on rest days',
    explanation:
      'Active recovery — light walking, swimming, yoga — improves blood flow and nutrient delivery to recovering muscles without creating new damage.',
    sort_order: 1,
    choices: [
      { id: C(157), question_id: Q(77), label: 'Light, low-intensity movement to enhance blood flow on rest days', is_correct: true, sort_order: 1 },
      { id: C(158), question_id: Q(77), label: 'Training at full intensity to push through soreness', is_correct: false, sort_order: 2 },
      { id: C(159), question_id: Q(77), label: 'Complete bed rest after every single workout', is_correct: false, sort_order: 3 },
      { id: C(160), question_id: Q(77), label: 'Stretching until all muscle soreness disappears', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(78),
    lesson_id: L(20),
    type: 'true_false',
    question_text: 'Muscle soreness (DOMS) always indicates that you had an effective workout.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'DOMS indicates muscle damage, which can be a growth stimulus — but it is not required. Absence of soreness does not mean a workout was ineffective. Metabolic stress also drives growth.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(79),
    lesson_id: L(20),
    type: 'multiple_choice',
    question_text: 'Which activity is most appropriate for active recovery between intense training sessions?',
    image_url: null,
    correct_answer: 'A 20-minute light walk or easy cycling at low intensity',
    explanation:
      'Light movement at 30–40% of maximum effort promotes blood flow and reduces muscle stiffness without creating new muscular damage that delays recovery.',
    sort_order: 3,
    choices: [
      { id: C(161), question_id: Q(79), label: 'A 20-minute light walk or easy cycling at low intensity', is_correct: true, sort_order: 1 },
      { id: C(162), question_id: Q(79), label: 'A heavy leg session the day after leg day', is_correct: false, sort_order: 2 },
      { id: C(163), question_id: Q(79), label: 'A maximum-intensity sprint interval session', is_correct: false, sort_order: 3 },
      { id: C(164), question_id: Q(79), label: 'No activity whatsoever — complete rest only', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(80),
    lesson_id: L(20),
    type: 'fill_blank',
    question_text:
      'Foam rolling is a form of self-myofascial ___ that reduces muscle tightness and improves range of motion.',
    image_url: null,
    correct_answer: 'release',
    explanation:
      'Self-myofascial release (SMR) applies targeted pressure to tight spots in muscle fascia, helping break up adhesions and reducing tightness to improve movement quality.',
    sort_order: 4,
    choices: [],
  },

  // L21: Q81-Q84
  {
    id: Q(81),
    lesson_id: L(21),
    type: 'multiple_choice',
    question_text: 'The primary purpose of a programmed deload week is:',
    image_url: null,
    correct_answer: 'To let accumulated fatigue dissipate while maintaining fitness adaptations',
    explanation:
      'Deload weeks are planned recovery periods where reduced training clears fatigue, revealing the fitness gains made during the preceding training block.',
    sort_order: 1,
    choices: [
      { id: C(165), question_id: Q(81), label: 'To let accumulated fatigue dissipate while maintaining fitness adaptations', is_correct: true, sort_order: 1 },
      { id: C(166), question_id: Q(81), label: 'To lose weight quickly before an event', is_correct: false, sort_order: 2 },
      { id: C(167), question_id: Q(81), label: 'To test your true maximum strength lifts', is_correct: false, sort_order: 3 },
      { id: C(168), question_id: Q(81), label: 'To learn and practice new exercises only', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(82),
    lesson_id: L(21),
    type: 'true_false',
    question_text: 'During a deload, you should stop training completely.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'A deload involves reduced volume (typically 40–60% of normal), not complete rest. Light training maintains movement patterns, neural adaptations, and tissue blood flow.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(83),
    lesson_id: L(21),
    type: 'multiple_choice',
    question_text: 'How often should most intermediate lifters schedule a deload week?',
    image_url: null,
    correct_answer: 'Every 4–8 weeks',
    explanation:
      'Most intermediate+ lifters benefit from a deload every 4–8 weeks depending on training intensity and individual recovery capacity. Beginners often need them less frequently.',
    sort_order: 3,
    choices: [
      { id: C(169), question_id: Q(83), label: 'Every 4–8 weeks', is_correct: true, sort_order: 1 },
      { id: C(170), question_id: Q(83), label: 'Every 2 days of training', is_correct: false, sort_order: 2 },
      { id: C(171), question_id: Q(83), label: 'Once per year only', is_correct: false, sort_order: 3 },
      { id: C(172), question_id: Q(83), label: 'Only after suffering an injury', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(84),
    lesson_id: L(21),
    type: 'fill_blank',
    question_text:
      'During a deload, training volume is typically reduced to approximately ___% of normal volume.',
    image_url: null,
    correct_answer: '50',
    explanation:
      'A standard deload performs normal exercises at ~50% of usual volume (half the sets) with the same or slightly lighter weights, providing active recovery while staying in the gym.',
    sort_order: 4,
    choices: [],
  },

  // UNIT 7 — Cardio Science

  // L22: Q85-Q88
  {
    id: Q(85),
    lesson_id: L(22),
    type: 'multiple_choice',
    question_text: 'HIIT stands for:',
    image_url: null,
    correct_answer: 'High-Intensity Interval Training',
    explanation:
      'HIIT alternates between near-maximum effort intervals and recovery periods, typically in work-to-rest ratios like 20s on/40s off, stimulating both aerobic and anaerobic systems.',
    sort_order: 1,
    choices: [
      { id: C(173), question_id: Q(85), label: 'High-Intensity Interval Training', is_correct: true, sort_order: 1 },
      { id: C(174), question_id: Q(85), label: 'Heavy-Impact Isolation Training', is_correct: false, sort_order: 2 },
      { id: C(175), question_id: Q(85), label: 'High-Intensity Isotonic Training', is_correct: false, sort_order: 3 },
      { id: C(176), question_id: Q(85), label: 'Hybrid Interval and Isometric Training', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(86),
    lesson_id: L(22),
    type: 'true_false',
    question_text: 'Steady-state cardio burns more total calories per session than HIIT of equal duration.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'HIIT burns significantly more calories per unit time due to higher intensity and EPOC — the afterburn effect that continues elevating metabolism for hours post-exercise.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(87),
    lesson_id: L(22),
    type: 'multiple_choice',
    question_text: 'The main advantage of steady-state cardio over HIIT is:',
    image_url: null,
    correct_answer: 'Lower injury risk and less interference with strength training recovery',
    explanation:
      'Steady-state cardio creates less physiological stress and interferes less with strength training recovery, making it more sustainable and safer for frequent use.',
    sort_order: 3,
    choices: [
      { id: C(177), question_id: Q(87), label: 'Lower injury risk and less interference with strength training recovery', is_correct: true, sort_order: 1 },
      { id: C(178), question_id: Q(87), label: 'Faster results in half the time', is_correct: false, sort_order: 2 },
      { id: C(179), question_id: Q(87), label: 'Greater muscle-building stimulus', is_correct: false, sort_order: 3 },
      { id: C(180), question_id: Q(87), label: 'Higher calorie burn per minute of exercise', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(88),
    lesson_id: L(22),
    type: 'fill_blank',
    question_text:
      "The scientific term for the 'afterburn effect' — elevated calorie burn after HIIT — is ___.",
    image_url: null,
    correct_answer: 'EPOC',
    explanation:
      'EPOC (Excess Post-exercise Oxygen Consumption) describes the elevated metabolic rate following intense exercise as the body restores oxygen stores, repairs tissue, and returns to homeostasis.',
    sort_order: 4,
    choices: [],
  },

  // L23: Q89-Q92
  {
    id: Q(89),
    lesson_id: L(23),
    type: 'multiple_choice',
    question_text: 'VO2 max is a measure of:',
    image_url: null,
    correct_answer: 'The maximum volume of oxygen the body can utilize during intense exercise',
    explanation:
      'VO2 max (maximal oxygen uptake) is the gold standard of cardiovascular fitness — reflecting the combined capacity of heart, lungs, and muscles to deliver and use oxygen.',
    sort_order: 1,
    choices: [
      { id: C(181), question_id: Q(89), label: 'The maximum volume of oxygen the body can utilize during intense exercise', is_correct: true, sort_order: 1 },
      { id: C(182), question_id: Q(89), label: 'Total lung capacity measured at rest', is_correct: false, sort_order: 2 },
      { id: C(183), question_id: Q(89), label: 'Maximum CO2 output during exercise', is_correct: false, sort_order: 3 },
      { id: C(184), question_id: Q(89), label: 'The lowest resting heart rate achievable', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(90),
    lesson_id: L(23),
    type: 'true_false',
    question_text: 'VO2 max cannot be meaningfully improved through training.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'VO2 max can improve by 10–20% or more through consistent aerobic training, especially HIIT and tempo runs at 70–85% of maximum effort over weeks and months.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(91),
    lesson_id: L(23),
    type: 'multiple_choice',
    question_text: 'What type of training most effectively improves VO2 max?',
    image_url: null,
    correct_answer: 'High-intensity intervals at 90–100% of maximum effort',
    explanation:
      'Training at or near VO2 max intensity provides the greatest cardiac and pulmonary stimulus, improving stroke volume, cardiac output, and oxygen delivery to muscles.',
    sort_order: 3,
    choices: [
      { id: C(185), question_id: Q(91), label: 'High-intensity intervals at 90–100% of maximum effort', is_correct: true, sort_order: 1 },
      { id: C(186), question_id: Q(91), label: 'Comfortable walking at a leisurely pace', is_correct: false, sort_order: 2 },
      { id: C(187), question_id: Q(91), label: 'Heavy barbell strength training only', is_correct: false, sort_order: 3 },
      { id: C(188), question_id: Q(91), label: 'Static stretching and mobility work', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(92),
    lesson_id: L(23),
    type: 'fill_blank',
    question_text: 'A higher VO2 max is generally associated with ___ cardiovascular fitness.',
    image_url: null,
    correct_answer: 'better',
    explanation:
      'VO2 max is the single best indicator of aerobic fitness. Elite endurance athletes have values more than double those of sedentary individuals.',
    sort_order: 4,
    choices: [],
  },

  // L24: Q93-Q96
  {
    id: Q(93),
    lesson_id: L(24),
    type: 'multiple_choice',
    question_text: "The 'interference effect' in concurrent training refers to:",
    image_url: null,
    correct_answer: 'Excessive cardio potentially reducing strength and muscle gains',
    explanation:
      'High volumes of cardio activate AMPK signaling, which can inhibit mTOR — the primary pathway for muscle protein synthesis and hypertrophy.',
    sort_order: 1,
    choices: [
      { id: C(189), question_id: Q(93), label: 'Excessive cardio potentially reducing strength and muscle gains', is_correct: true, sort_order: 1 },
      { id: C(190), question_id: Q(93), label: 'Strength training improving cardio performance over time', is_correct: false, sort_order: 2 },
      { id: C(191), question_id: Q(93), label: 'The effect of music selection on exercise output', is_correct: false, sort_order: 3 },
      { id: C(192), question_id: Q(93), label: 'How hydration levels affect strength performance', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(94),
    lesson_id: L(24),
    type: 'true_false',
    question_text: 'Combining cardio and strength training in the same program is always harmful to muscle gains.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'When programmed correctly, concurrent training works well. The interference effect is mainly problematic at very high cardio volumes. Most lifters can include moderate cardio safely.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(95),
    lesson_id: L(24),
    type: 'multiple_choice',
    question_text: 'The best type of cardio for preserving muscle mass while improving fitness is:',
    image_url: null,
    correct_answer: 'Shorter, high-intensity sessions like HIIT (20–30 minutes)',
    explanation:
      'Short, intense cardio sessions minimize catabolic stress duration while maintaining cardiovascular benefits. Excessive long-duration steady-state cardio is more muscle-wasting.',
    sort_order: 3,
    choices: [
      { id: C(193), question_id: Q(95), label: 'Shorter, high-intensity sessions like HIIT (20–30 minutes)', is_correct: true, sort_order: 1 },
      { id: C(194), question_id: Q(95), label: 'Daily 2-hour marathon training sessions', is_correct: false, sort_order: 2 },
      { id: C(195), question_id: Q(95), label: 'Maximum heart rate cardio for 90 minutes daily', is_correct: false, sort_order: 3 },
      { id: C(196), question_id: Q(95), label: 'Cardio has zero effect on muscle mass whatsoever', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(96),
    lesson_id: L(24),
    type: 'fill_blank',
    question_text:
      'To minimize interference between cardio and strength training, perform them on ___ days when possible.',
    image_url: null,
    correct_answer: 'separate',
    explanation:
      'Performing cardio and strength training on separate days allows complete recovery between sessions, minimizing the AMPK-mTOR interference effect on muscle growth signaling.',
    sort_order: 4,
    choices: [],
  },

  // UNIT 8 — Advanced Nutrition

  // L25: Q97-Q100
  {
    id: Q(97),
    lesson_id: L(25),
    type: 'multiple_choice',
    question_text: 'Creatine monohydrate improves performance by:',
    image_url: null,
    correct_answer: 'Increasing phosphocreatine stores to rapidly regenerate ATP',
    explanation:
      'Creatine increases phosphocreatine (PCr) stores in muscles, allowing faster ATP regeneration during short, high-intensity bursts like heavy sets and sprints.',
    sort_order: 1,
    choices: [
      { id: C(197), question_id: Q(97), label: 'Increasing phosphocreatine stores to rapidly regenerate ATP', is_correct: true, sort_order: 1 },
      { id: C(198), question_id: Q(97), label: 'Directly synthesizing new muscle tissue', is_correct: false, sort_order: 2 },
      { id: C(199), question_id: Q(97), label: 'Replacing dietary protein in the muscles', is_correct: false, sort_order: 3 },
      { id: C(200), question_id: Q(97), label: 'Increasing the rate of fat burning', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(98),
    lesson_id: L(25),
    type: 'true_false',
    question_text: 'Creatine is a steroid and is banned by the Olympic Committee.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Creatine is a naturally occurring compound found in meat and fish. It is NOT a steroid, is not banned in any sport including the Olympics, and is one of the most researched safe supplements.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(99),
    lesson_id: L(25),
    type: 'multiple_choice',
    question_text: 'The standard daily maintenance dose of creatine monohydrate is:',
    image_url: null,
    correct_answer: '3–5 grams per day',
    explanation:
      '3–5g/day maintains muscle creatine saturation after the initial loading phase (optional). Taking more provides no additional benefit once muscle stores are fully saturated.',
    sort_order: 3,
    choices: [
      { id: C(201), question_id: Q(99), label: '3–5 grams per day', is_correct: true, sort_order: 1 },
      { id: C(202), question_id: Q(99), label: '50 grams per day for maximum effect', is_correct: false, sort_order: 2 },
      { id: C(203), question_id: Q(99), label: '0.1 grams per day', is_correct: false, sort_order: 3 },
      { id: C(204), question_id: Q(99), label: '20 grams per day at all times', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(100),
    lesson_id: L(25),
    type: 'fill_blank',
    question_text:
      'Protein powder is simply a convenient ___ source — it has no magical properties beyond providing dietary protein.',
    image_url: null,
    correct_answer: 'food',
    explanation:
      'Protein powder is a concentrated food supplement. Its benefits come entirely from providing dietary protein — the same as eating chicken or eggs, just more convenient.',
    sort_order: 4,
    choices: [],
  },

  // L26: Q101-Q104
  {
    id: Q(101),
    lesson_id: L(26),
    type: 'multiple_choice',
    question_text: 'A caloric surplus means:',
    image_url: null,
    correct_answer: 'Consuming more calories than you burn each day',
    explanation:
      'A caloric surplus provides the extra energy needed to support muscle growth. Without excess calories, building significant muscle mass is extremely difficult for most people.',
    sort_order: 1,
    choices: [
      { id: C(205), question_id: Q(101), label: 'Consuming more calories than you burn each day', is_correct: true, sort_order: 1 },
      { id: C(206), question_id: Q(101), label: 'Eating fewer calories than you burn each day', is_correct: false, sort_order: 2 },
      { id: C(207), question_id: Q(101), label: 'Eating exactly the same calories you burn', is_correct: false, sort_order: 3 },
      { id: C(208), question_id: Q(101), label: 'Meticulously tracking every calorie you consume', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(102),
    lesson_id: L(26),
    type: 'true_false',
    question_text: 'It is impossible to build muscle and lose fat at the same time.',
    image_url: null,
    correct_answer: 'false',
    explanation:
      'Body recomposition — simultaneously building muscle while losing fat — is possible, especially for beginners, those returning from a break, or individuals with higher body fat percentages.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(103),
    lesson_id: L(26),
    type: 'multiple_choice',
    question_text: "For a 'lean bulk' (minimizing fat gain while building muscle), the recommended daily surplus is:",
    image_url: null,
    correct_answer: '200–300 calories above maintenance',
    explanation:
      'A modest 200–300 calorie surplus (~5–10% above maintenance) provides sufficient energy for muscle growth while minimizing unnecessary fat accumulation.',
    sort_order: 3,
    choices: [
      { id: C(209), question_id: Q(103), label: '200–300 calories above maintenance', is_correct: true, sort_order: 1 },
      { id: C(210), question_id: Q(103), label: '1000+ calories above maintenance for maximum growth', is_correct: false, sort_order: 2 },
      { id: C(211), question_id: Q(103), label: 'Exactly at maintenance calories', is_correct: false, sort_order: 3 },
      { id: C(212), question_id: Q(103), label: '500 calories below maintenance while training heavy', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(104),
    lesson_id: L(26),
    type: 'fill_blank',
    question_text:
      "TDEE stands for Total Daily ___ Expenditure — your body's total daily calorie burn.",
    image_url: null,
    correct_answer: 'Energy',
    explanation:
      'TDEE is the total calories burned per day, including BMR (basal metabolic rate) plus all activity. It represents your caloric maintenance level — the baseline for bulking or cutting.',
    sort_order: 4,
    choices: [],
  },

  // L27: Q105-Q108
  {
    id: Q(105),
    lesson_id: L(27),
    type: 'multiple_choice',
    question_text: "The post-workout 'anabolic window' for nutrition timing is:",
    image_url: null,
    correct_answer: 'Less critical than total daily protein and calorie intake',
    explanation:
      'Research shows the anabolic window is much broader than once believed — hours rather than minutes. Total daily nutrition matters far more than exact post-workout timing.',
    sort_order: 1,
    choices: [
      { id: C(213), question_id: Q(105), label: 'Less critical than total daily protein and calorie intake', is_correct: true, sort_order: 1 },
      { id: C(214), question_id: Q(105), label: 'A strict 30-minute window that must never be missed', is_correct: false, sort_order: 2 },
      { id: C(215), question_id: Q(105), label: 'More important than sleep for muscle recovery', is_correct: false, sort_order: 3 },
      { id: C(216), question_id: Q(105), label: 'Only relevant for elite professional athletes', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(106),
    lesson_id: L(27),
    type: 'true_false',
    question_text: 'Consuming protein before bed can support overnight muscle protein synthesis.',
    image_url: null,
    correct_answer: 'true',
    explanation:
      'Slow-digesting casein protein (cottage cheese, Greek yogurt) provides a steady amino acid supply throughout sleep, supporting overnight muscle protein synthesis during the 7–9 hour fast.',
    sort_order: 2,
    choices: [],
  },
  {
    id: Q(107),
    lesson_id: L(27),
    type: 'multiple_choice',
    question_text: 'For optimal muscle protein synthesis throughout the day, you should aim for:',
    image_url: null,
    correct_answer: '3–5 protein-containing meals spread throughout the day',
    explanation:
      'Spreading protein across 3–5 meals consistently triggers the leucine threshold needed to maximally stimulate muscle protein synthesis multiple times daily.',
    sort_order: 3,
    choices: [
      { id: C(217), question_id: Q(107), label: '3–5 protein-containing meals spread throughout the day', is_correct: true, sort_order: 1 },
      { id: C(218), question_id: Q(107), label: 'One very large protein meal to maximize total absorption', is_correct: false, sort_order: 2 },
      { id: C(219), question_id: Q(107), label: '10+ small protein snacks every hour', is_correct: false, sort_order: 3 },
      { id: C(220), question_id: Q(107), label: 'Protein timing is completely irrelevant to muscle growth', is_correct: false, sort_order: 4 },
    ],
  },
  {
    id: Q(108),
    lesson_id: L(27),
    type: 'fill_blank',
    question_text:
      'Consuming ___ to 60 grams of carbohydrates 1–2 hours before training can improve high-intensity performance.',
    image_url: null,
    correct_answer: '30',
    explanation:
      '30–60g of pre-workout carbohydrates provides readily available glucose for high-intensity effort and tops off muscle glycogen stores for optimal training performance.',
    sort_order: 4,
    choices: [],
  },
];
