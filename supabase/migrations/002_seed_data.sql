-- =============================================================================
-- 002_seed_data.sql
-- Seed data for fitness education app
-- Units, Achievements, Lessons, Questions, and Question Choices
-- =============================================================================

-- =============================================================================
-- 1. UNITS
-- =============================================================================
insert into public.units (id, title, emoji, description, sort_order, unlock_requires) values
  ('11111111-0000-0000-0000-000000000001', 'Intro to Training',   '🏋️', 'Master the fundamentals of resistance training and why it works.', 1, null),
  ('11111111-0000-0000-0000-000000000002', 'Muscle Anatomy',       '🦵', 'Learn the muscles you''re training and how they function.', 2, null),
  ('11111111-0000-0000-0000-000000000003', 'Exercise Form',        '✅', 'Perfect your technique on the big compound movements.', 3, null),
  ('11111111-0000-0000-0000-000000000004', 'Nutrition Basics',     '🥗', 'Understand the fuel your body needs to perform and grow.', 4, '11111111-0000-0000-0000-000000000003'),
  ('11111111-0000-0000-0000-000000000005', 'Programming',          '📋', 'Design training programs that produce consistent progress.', 5, '11111111-0000-0000-0000-000000000004'),
  ('11111111-0000-0000-0000-000000000006', 'Recovery',             '😴', 'Learn why rest is where the real gains happen.', 6, '11111111-0000-0000-0000-000000000005'),
  ('11111111-0000-0000-0000-000000000007', 'Cardio Science',       '💨', 'Understand cardiovascular training and its relationship with muscle.', 7, '11111111-0000-0000-0000-000000000006'),
  ('11111111-0000-0000-0000-000000000008', 'Advanced Nutrition',   '🧪', 'Dive deep into supplements, timing, and body composition.', 8, '11111111-0000-0000-0000-000000000007');

-- =============================================================================
-- 2. ACHIEVEMENTS
-- =============================================================================
insert into public.achievements (key, title, description, icon_emoji) values
  ('first_lesson',   'First Rep',        'Complete your very first lesson.',           '🏅'),
  ('streak_3',       '3-Day Streak',     'Train 3 days in a row.',                     '🔥'),
  ('streak_7',       'Week Warrior',     'Maintain a 7-day streak.',                   '⚡'),
  ('streak_10',      'Iron Consistency', 'Keep a 10-day streak going.',                '💪'),
  ('streak_30',      'Unstoppable',      '30 days straight. You''re built different.', '🏆'),
  ('perfect_lesson', 'Perfect Form',     'Complete a lesson with zero wrong answers.', '⭐'),
  ('nutrition_nerd', 'Nutrition Nerd',   'Complete all Nutrition Basics lessons.',      '🥗'),
  ('anatomy_ace',    'Anatomy Ace',      'Complete all Muscle Anatomy lessons.',        '🦵'),
  ('form_master',    'Form Master',      'Complete all Exercise Form lessons.',         '✅'),
  ('iron_mind',      'Iron Mind',        'Complete every lesson in the curriculum.',   '🧠'),
  ('xp_500',         '500 XP Club',      'Earn 500 total XP.',                         '🎯'),
  ('xp_2000',        '2000 XP Elite',    'Earn 2000 total XP.',                        '💎');

-- =============================================================================
-- 3. LESSONS (27 total)
-- =============================================================================
insert into public.lessons (id, unit_id, title, sort_order, xp_reward) values
  -- Unit 1: Intro to Training
  ('22000001-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000001', 'What is Resistance Training?', 1, 20),
  ('22000002-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000001', 'Reps & Sets Explained',        2, 20),
  ('22000003-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000001', 'Progressive Overload',         3, 20),
  -- Unit 2: Muscle Anatomy
  ('22000004-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000002', 'Upper Body Muscles',           1, 20),
  ('22000005-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000002', 'Lower Body Muscles',           2, 20),
  ('22000006-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000002', 'Core Muscles',                 3, 20),
  ('22000007-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000002', 'Muscle Fiber Types',           4, 20),
  -- Unit 3: Exercise Form
  ('22000008-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000003', 'The Squat',                    1, 20),
  ('22000009-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000003', 'The Deadlift',                 2, 20),
  ('22000010-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000003', 'The Bench Press',              3, 20),
  ('22000011-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000003', 'Pull-ups & Rows',              4, 20),
  -- Unit 4: Nutrition Basics
  ('22000012-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000004', 'Macronutrients',               1, 25),
  ('22000013-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000004', 'Protein for Muscle Growth',    2, 25),
  ('22000014-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000004', 'Carbs & Energy',               3, 25),
  ('22000015-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000004', 'Fats Explained',               4, 25),
  -- Unit 5: Programming
  ('22000016-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000005', 'Training Frequency',           1, 25),
  ('22000017-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000005', 'Workout Splits',               2, 25),
  ('22000018-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000005', 'Periodization Basics',         3, 25),
  -- Unit 6: Recovery
  ('22000019-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000006', 'Why Sleep Matters',            1, 30),
  ('22000020-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000006', 'Active Recovery',              2, 30),
  ('22000021-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000006', 'Deload Weeks',                 3, 30),
  -- Unit 7: Cardio Science
  ('22000022-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000007', 'HIIT vs Steady-State',         1, 30),
  ('22000023-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000007', 'VO2 Max',                      2, 30),
  ('22000024-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000007', 'Cardio & Muscle',              3, 30),
  -- Unit 8: Advanced Nutrition
  ('22000025-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000008', 'Creatine & Supplements',       1, 35),
  ('22000026-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000008', 'Caloric Surplus & Deficit',    2, 35),
  ('22000027-0000-0000-0000-000000000000', '11111111-0000-0000-0000-000000000008', 'Meal Timing',                  3, 35);

-- =============================================================================
-- 4. QUESTIONS (108 total, 4 per lesson)
-- =============================================================================
insert into public.questions (id, lesson_id, type, prompt, correct_answer, explanation, sort_order, image_url) values

  -- L01: What is Resistance Training? (33000001-33000004)
  ('33000001-0000-0000-0000-000000000000', '22000001-0000-0000-0000-000000000000', 'multiple_choice', 'What is the primary purpose of resistance training?',                   'Build muscle strength and size',                    'Resistance training uses external load to stress muscles, causing them to adapt by growing stronger and larger through a process called hypertrophy.',                                                                                                                                    1, null),
  ('33000002-0000-0000-0000-000000000000', '22000001-0000-0000-0000-000000000000', 'true_false',      'Resistance training can only be done with free weights.',               'false',                                             'Resistance training can use free weights, machines, resistance bands, cables, or bodyweight — any form of load that challenges the muscles.',                                                                                                                                           2, null),
  ('33000003-0000-0000-0000-000000000000', '22000001-0000-0000-0000-000000000000', 'multiple_choice', 'Hypertrophy is the scientific term for:',                               'Muscle fiber size increase',                        'Hypertrophy specifically refers to an increase in the size of muscle fibers in response to progressive overload stress during resistance training.',                                                                                                                                    3, null),
  ('33000004-0000-0000-0000-000000000000', '22000001-0000-0000-0000-000000000000', 'fill_blank',      'Resistance training causes micro-tears in muscle fibers, which repair and grow back ___ during recovery.',                                                                   'stronger',                                          'This process — damage, repair, supercompensation — is the foundation of all strength and muscle adaptations from resistance training.',                                                                                                                                                  4, null),

  -- L02: Reps & Sets Explained (33000005-33000008)
  ('33000005-0000-0000-0000-000000000000', '22000002-0000-0000-0000-000000000000', 'multiple_choice', 'What is one complete movement of an exercise called?',                  'A repetition (rep)',                                'A rep is one full execution of an exercise from start position back to start. Multiple reps performed back-to-back form a set.',                                                                                                                                                      1, null),
  ('33000006-0000-0000-0000-000000000000', '22000002-0000-0000-0000-000000000000', 'true_false',      'A set is a group of consecutive repetitions performed without resting.','true',                                              'A set is a series of reps done back-to-back before taking a rest break between sets.',                                                                                                                                                                                          2, null),
  ('33000007-0000-0000-0000-000000000000', '22000002-0000-0000-0000-000000000000', 'multiple_choice', 'For building muscle size (hypertrophy), the optimal rep range is:',     '8–12 reps',                                         'The 8–12 rep range creates the ideal balance of mechanical tension and metabolic stress for maximizing muscle hypertrophy.',                                                                                                                                                      3, null),
  ('33000008-0000-0000-0000-000000000000', '22000002-0000-0000-0000-000000000000', 'fill_blank',      'Training with very low reps (1–5) and heavy weight primarily develops muscular ___.',                                                                                        'strength',                                          'Low-rep, heavy-weight training emphasizes neural adaptations and maximal force production — the definition of strength development.',                                                                                                                                                    4, null),

  -- L03: Progressive Overload (33000009-33000012)
  ('33000009-0000-0000-0000-000000000000', '22000003-0000-0000-0000-000000000000', 'multiple_choice', 'Progressive overload means:',                                           'Gradually increasing training stress over time',    'Progressive overload is the gradual increase of stress placed on muscles — through more weight, reps, or sets — to keep them adapting and growing.',                                                                                                                            1, null),
  ('33000010-0000-0000-0000-000000000000', '22000003-0000-0000-0000-000000000000', 'true_false',      'You must always add more weight to the bar to achieve progressive overload.',                                                                                                'false',                                             'Progressive overload can be achieved by adding reps, sets, reducing rest time, improving range of motion, or increasing exercise difficulty — not just adding weight.',                                                                                                                  2, null),
  ('33000011-0000-0000-0000-000000000000', '22000003-0000-0000-0000-000000000000', 'multiple_choice', 'The safest way to apply progressive overload as a beginner is:',        'Add 2.5–5 lbs when you complete all reps with good form', 'Small, regular load increases allow continuous adaptation while keeping injury risk low. Rushing progression leads to form breakdown.',                                                                                                                                    3, null),
  ('33000012-0000-0000-0000-000000000000', '22000003-0000-0000-0000-000000000000', 'fill_blank',      'Without progressive overload, your body will reach a training ___ and stop adapting.',                                                                                      'plateau',                                           'Without new stimulus, the body has no reason to keep adapting. This plateau is broken by applying progressive overload principles consistently.',                                                                                                                                        4, null),

  -- L04: Upper Body Muscles (33000013-33000016)
  ('33000013-0000-0000-0000-000000000000', '22000004-0000-0000-0000-000000000000', 'multiple_choice', 'Which muscle is primarily responsible for shoulder abduction (raising the arm to the side)?',                                                                                'Deltoid',                                           'The lateral head of the deltoid is the prime mover for shoulder abduction — raising the arm out to the side. The other deltoid heads handle flexion and extension.',                                                                                                                    1, null),
  ('33000014-0000-0000-0000-000000000000', '22000004-0000-0000-0000-000000000000', 'true_false',      'The biceps brachii has two muscle heads.',                              'true',                                              'The biceps brachii has a long head and a short head. Both originate near the shoulder, making it a multi-joint muscle involved in elbow flexion and forearm supination.',                                                                                                          2, null),
  ('33000015-0000-0000-0000-000000000000', '22000004-0000-0000-0000-000000000000', 'multiple_choice', 'The pectoralis major''s primary function is:',                          'Horizontal shoulder adduction and flexion',         'The pec major pulls the arm across the body (adduction) and forward (flexion), which is why pressing and fly exercises effectively target it.',                                                                                                                              3, null),
  ('33000016-0000-0000-0000-000000000000', '22000004-0000-0000-0000-000000000000', 'image_match',     'Which back muscle is known as the ''wings'' — the large fan-shaped muscle responsible for pull-downs and rows?',                                                             'Latissimus dorsi',                                  'The latissimus dorsi originates from the lower back and inserts on the upper arm. It''s the primary mover in all pulling exercises and gives the back its V-taper shape.',                                                                                                              4, 'muscle_back_diagram.svg'),

  -- L05: Lower Body Muscles (33000017-33000020)
  ('33000017-0000-0000-0000-000000000000', '22000005-0000-0000-0000-000000000000', 'multiple_choice', 'The quadriceps group consists of how many individual muscles?',          '4 muscles',                                         'The quads are: rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius. All four converge to extend the knee via the patellar tendon.',                                                                                                                            1, null),
  ('33000018-0000-0000-0000-000000000000', '22000005-0000-0000-0000-000000000000', 'true_false',      'The hamstrings cross both the hip and knee joints.',                    'true',                                              'Most hamstrings (semitendinosus, semimembranosus, biceps femoris long head) originate at the ischial tuberosity and insert below the knee, crossing both joints.',                                                                                                                  2, null),
  ('33000019-0000-0000-0000-000000000000', '22000005-0000-0000-0000-000000000000', 'multiple_choice', 'Which muscle is primarily targeted by a standing calf raise?',          'Gastrocnemius',                                     'The gastrocnemius is the large, visible calf muscle best targeted by standing calf raises. The soleus is better targeted with seated raises due to the bent-knee position.',                                                                                                      3, null),
  ('33000020-0000-0000-0000-000000000000', '22000005-0000-0000-0000-000000000000', 'fill_blank',      'The gluteus ___ is the largest muscle in the human body.',              'maximus',                                           'The gluteus maximus is the body''s largest muscle, primarily responsible for hip extension and external rotation — essential for squats, deadlifts, and running.',                                                                                                                4, null),

  -- L06: Core Muscles (33000021-33000024)
  ('33000021-0000-0000-0000-000000000000', '22000006-0000-0000-0000-000000000000', 'multiple_choice', 'The core is best described as:',                                        'Muscles around the spine and pelvis providing stability', 'The core includes the rectus abdominis, transverse abdominis, obliques, multifidus, and erector spinae — working together as a stability system, not just the abs.',                                                                                                          1, null),
  ('33000022-0000-0000-0000-000000000000', '22000006-0000-0000-0000-000000000000', 'true_false',      'Doing thousands of sit-ups is the most effective way to get visible abs.','false',                                            'Visible abs require low body fat. You can have strong abs hidden under fat. Diet and caloric balance matter far more than ab exercises for abdominal visibility.',                                                                                                                  2, null),
  ('33000023-0000-0000-0000-000000000000', '22000006-0000-0000-0000-000000000000', 'multiple_choice', 'Which deep core muscle acts as the body''s natural weight belt?',       'Transverse abdominis',                              'The transverse abdominis wraps around the spine like a corset, creating intra-abdominal pressure that stabilizes the spine during heavy compound lifts.',                                                                                                                          3, null),
  ('33000024-0000-0000-0000-000000000000', '22000006-0000-0000-0000-000000000000', 'fill_blank',      'Bracing your core means creating ___ pressure in the abdomen to protect the spine.',                                                                                        'intra-abdominal',                                   'Intra-abdominal pressure, created by breathing in and bracing, provides critical spinal stability during heavy compound movements like squats and deadlifts.',                                                                                                                          4, null),

  -- L07: Muscle Fiber Types (33000025-33000028)
  ('33000025-0000-0000-0000-000000000000', '22000007-0000-0000-0000-000000000000', 'multiple_choice', 'Type I (slow-twitch) muscle fibers are characterized by:',              'High endurance, low force output',                  'Type I fibers are fatigue-resistant, rich in mitochondria, and used for endurance activities. They produce less force but can sustain effort for long periods.',                                                                                                                    1, null),
  ('33000026-0000-0000-0000-000000000000', '22000007-0000-0000-0000-000000000000', 'true_false',      'Type II (fast-twitch) muscle fibers fatigue more slowly than Type I fibers.','false',                                         'Type II fibers fatigue quickly but generate much more force. Type I fibers are the fatigue-resistant, endurance-oriented fibers.',                                                                                                                                                    2, null),
  ('33000027-0000-0000-0000-000000000000', '22000007-0000-0000-0000-000000000000', 'multiple_choice', 'Which type of training best recruits fast-twitch (Type II) muscle fibers?','Heavy lifting and explosive power movements',      'Type II fibers are recruited for high-intensity, short-duration efforts like maximal lifting, sprinting, and explosive power movements.',                                                                                                                                        3, null),
  ('33000028-0000-0000-0000-000000000000', '22000007-0000-0000-0000-000000000000', 'fill_blank',      'The ratio of slow-twitch to fast-twitch muscle fibers a person has is largely determined by ___.',                                                                           'genetics',                                          'While training can influence fiber type characteristics, the basic ratio of Type I to Type II fibers is largely genetically predetermined and varies significantly between individuals.',                                                                                                4, null),

  -- L08: The Squat (33000029-33000032)
  ('33000029-0000-0000-0000-000000000000', '22000008-0000-0000-0000-000000000000', 'multiple_choice', 'During a squat, the knees should:',                                     'Track over the toes throughout the movement',       'Allowing the knees to track in line with the toes ensures proper force distribution and reduces knee stress. Caving inward (valgus) increases injury risk.',                                                                                                              1, null),
  ('33000030-0000-0000-0000-000000000000', '22000008-0000-0000-0000-000000000000', 'true_false',      'Your heels should stay flat on the floor throughout the squat.',        'true',                                              'Keeping heels flat ensures proper weight distribution and maximizes power. If heels rise, limited ankle mobility is usually the cause and should be addressed.',                                                                                                                  2, null),
  ('33000031-0000-0000-0000-000000000000', '22000008-0000-0000-0000-000000000000', 'multiple_choice', 'The primary muscles targeted in a back squat are:',                    'Quadriceps, glutes, and hamstrings',                'The squat is a lower-body compound movement. Quads extend the knee, while glutes and hamstrings drive hip extension. The erector spinae stabilize the spine.',                                                                                                                3, null),
  ('33000032-0000-0000-0000-000000000000', '22000008-0000-0000-0000-000000000000', 'fill_blank',      'Maintaining a ___ spine position during the squat protects the vertebral discs from excessive load.',                                                                        'neutral',                                           'A neutral spine — preserving the natural lumbar curve without excessive rounding or hyperextension — distributes spinal load safely throughout the squat.',                                                                                                                            4, null),

  -- L09: The Deadlift (33000033-33000036)
  ('33000033-0000-0000-0000-000000000000', '22000009-0000-0000-0000-000000000000', 'multiple_choice', 'In the deadlift setup, the barbell should be positioned:',              'Over the mid-foot',                                 'The bar should be over mid-foot in setup. When you hinge to grip it, the bar comes to your shins, then stays close to the body throughout the entire lift.',                                                                                                                      1, null),
  ('33000034-0000-0000-0000-000000000000', '22000009-0000-0000-0000-000000000000', 'true_false',      'Rounding your lower back during a deadlift increases your range of motion safely.','false',                                   'Lumbar rounding during a deadlift significantly increases injury risk to spinal discs. A neutral spine with braced core is essential for safe and effective deadlifting.',                                                                                                          2, null),
  ('33000035-0000-0000-0000-000000000000', '22000009-0000-0000-0000-000000000000', 'multiple_choice', 'The deadlift is called a ''hip hinge'' because:',                       'The primary movement is hip extension, driving hips forward', 'The deadlift starts with hip hinging backward and is completed by driving hips forward into extension. Glutes and hamstrings are the prime movers, not the quads.',                                                                                                          3, null),
  ('33000036-0000-0000-0000-000000000000', '22000009-0000-0000-0000-000000000000', 'fill_blank',      'The Romanian Deadlift differs from the conventional deadlift in that the knees remain nearly ___ throughout.',                                                               'straight',                                          'The RDL isolates hamstrings and glutes more effectively by keeping knees mostly straight, maximizing the hip hinge and hamstring stretch under load.',                                                                                                                                  4, null),

  -- L10: The Bench Press (33000037-33000040)
  ('33000037-0000-0000-0000-000000000000', '22000010-0000-0000-0000-000000000000', 'multiple_choice', 'The proper grip width for a standard barbell bench press is:',          'Slightly wider than shoulder-width',                'A slightly wider than shoulder-width grip creates ~90-degree elbow angle at the bottom, maximizing pec activation while protecting shoulder health.',                                                                                                                          1, null),
  ('33000038-0000-0000-0000-000000000000', '22000010-0000-0000-0000-000000000000', 'true_false',      'The barbell should touch your chest at the bottom of the bench press.', 'true',                                              'Full range of motion means touching the bar to the lower chest/sternum area. This maximizes muscle stretch, activation, and long-term strength development.',                                                                                                                    2, null),
  ('33000039-0000-0000-0000-000000000000', '22000010-0000-0000-0000-000000000000', 'multiple_choice', 'Retracting your shoulder blades during the bench press primarily:',     'Creates a stable base and protects the shoulder joint', 'Scapular retraction and depression creates a stable ''shelf'' for the upper back, reduces shoulder joint stress, and allows safer, stronger pressing mechanics.',                                                                                                           3, null),
  ('33000040-0000-0000-0000-000000000000', '22000010-0000-0000-0000-000000000000', 'fill_blank',      'During the bench press, the bar should travel in a slight ___ path — lower at the bottom and higher at lockout.',                                                            'diagonal',                                          'The diagonal bar path follows the natural arc of the chest muscles and keeps the bar over the elbow joint, maximizing mechanical advantage throughout the press.',                                                                                                                    4, null),

  -- L11: Pull-ups & Rows (33000041-33000044)
  ('33000041-0000-0000-0000-000000000000', '22000011-0000-0000-0000-000000000000', 'multiple_choice', 'Pull-ups primarily target which muscle?',                               'Latissimus dorsi',                                  'The lats are the prime mover in pull-ups — pulling the upper arm toward the body (shoulder adduction and extension). Biceps and rear delts assist as secondary movers.',                                                                                                          1, null),
  ('33000042-0000-0000-0000-000000000000', '22000011-0000-0000-0000-000000000000', 'true_false',      'A chin-up (palms facing you) involves more bicep activation than a standard pull-up.','true',                               'The supinated (underhand) grip in a chin-up places the biceps in a mechanically stronger position, increasing their contribution compared to the pronated pull-up grip.',                                                                                                      2, null),
  ('33000043-0000-0000-0000-000000000000', '22000011-0000-0000-0000-000000000000', 'multiple_choice', 'During a row, you should initiate the movement by:',                    'Retracting the shoulder blade before bending the elbow', 'Initiating rows with scapular retraction ensures lats and rhomboids do the work. If you pull with the arm first, biceps dominate and back muscles are undertrained.',                                                                                                        3, null),
  ('33000044-0000-0000-0000-000000000000', '22000011-0000-0000-0000-000000000000', 'fill_blank',      'To maximize lat engagement during rows and pull-ups, focus on driving your elbows ___ your torso.',                                                                          'into',                                              'Visualizing driving elbows into your sides (rather than curling with biceps) activates the lats more effectively during all pulling exercises.',                                                                                                                                        4, null),

  -- L12: Macronutrients (33000045-33000048)
  ('33000045-0000-0000-0000-000000000000', '22000012-0000-0000-0000-000000000000', 'multiple_choice', 'The three macronutrients are:',                                         'Protein, carbohydrates, and fats',                  'The three macronutrients provide energy and serve distinct physiological roles. Protein builds tissue, carbs fuel activity, and fats support hormones and cell membranes.',                                                                                                    1, null),
  ('33000046-0000-0000-0000-000000000000', '22000012-0000-0000-0000-000000000000', 'true_false',      'All three macronutrients provide 4 calories per gram.',                 'false',                                             'Protein and carbohydrates provide 4 calories per gram. Fat provides 9 calories per gram — more than twice as much, making it the most calorie-dense macronutrient.',                                                                                                            2, null),
  ('33000047-0000-0000-0000-000000000000', '22000012-0000-0000-0000-000000000000', 'multiple_choice', 'The body''s preferred immediate fuel source for high-intensity exercise is:','Carbohydrates',                               'Carbohydrates break down into glucose, the body''s primary fuel for high-intensity exercise and the brain''s preferred energy source during demanding mental and physical tasks.',                                                                                              3, null),
  ('33000048-0000-0000-0000-000000000000', '22000012-0000-0000-0000-000000000000', 'fill_blank',      'Fat provides ___ calories per gram — more than double that of protein or carbohydrates.',                                                                                    '9',                                                 'Fat''s 9 kcal/g density makes it the most energy-dense macronutrient. This is why high-fat foods are calorie-dense and portion control matters when tracking intake.',                                                                                                              4, null),

  -- L13: Protein for Muscle Growth (33000049-33000052)
  ('33000049-0000-0000-0000-000000000000', '22000013-0000-0000-0000-000000000000', 'multiple_choice', 'The recommended daily protein intake for maximizing muscle growth is approximately:','1.6–2.2 grams per kilogram of bodyweight','Research consistently shows that 1.6–2.2g/kg/day is the effective range for maximizing muscle protein synthesis. Consuming more provides minimal additional benefit.',                                                                                    1, null),
  ('33000050-0000-0000-0000-000000000000', '22000013-0000-0000-0000-000000000000', 'true_false',      'The body can fully utilize an unlimited amount of protein consumed in a single meal.','false',                              'The body can use approximately 20–40g of protein per meal for muscle protein synthesis. Excess protein above this is used for energy or other metabolic processes.',                                                                                                          2, null),
  ('33000051-0000-0000-0000-000000000000', '22000013-0000-0000-0000-000000000000', 'multiple_choice', 'Which protein source is considered ''complete,'' containing all essential amino acids?','Animal proteins like meat, eggs, and dairy','Complete proteins contain all 9 essential amino acids in adequate ratios. Most animal proteins are complete. Most plant proteins lack one or more EAAs.',                                                                                              3, null),
  ('33000052-0000-0000-0000-000000000000', '22000013-0000-0000-0000-000000000000', 'fill_blank',      'The amino acid ___ acts as the key trigger for muscle protein synthesis via the mTOR pathway.',                                                                              'leucine',                                           'Leucine is the primary amino acid responsible for activating muscle protein synthesis. Meals need 2–3g of leucine to fully stimulate MPS — found in about 30g of quality protein.',                                                                                                4, null),

  -- L14: Carbs & Energy (33000053-33000056)
  ('33000053-0000-0000-0000-000000000000', '22000014-0000-0000-0000-000000000000', 'multiple_choice', 'Glycogen is:',                                                           'Stored carbohydrate in muscles and liver',          'Glycogen is the stored form of glucose. Muscle glycogen is the primary fuel for high-intensity training. Liver glycogen maintains blood glucose between meals.',                                                                                                          1, null),
  ('33000054-0000-0000-0000-000000000000', '22000014-0000-0000-0000-000000000000', 'true_false',      'Eating carbohydrates before a workout can improve high-intensity performance.','true',                                       'Pre-workout carbohydrates top off glycogen stores and provide readily available glucose, improving energy availability and performance during intense training.',                                                                                                                2, null),
  ('33000055-0000-0000-0000-000000000000', '22000014-0000-0000-0000-000000000000', 'multiple_choice', 'Which type of carbohydrate provides more sustained, steady energy?',    'Complex carbs like oats and sweet potato',          'Complex carbs have longer molecular chains, digest slower, and provide steadier energy. Simple sugars cause rapid glucose spikes followed by energy crashes.',                                                                                                            3, null),
  ('33000056-0000-0000-0000-000000000000', '22000014-0000-0000-0000-000000000000', 'fill_blank',      'Muscle glycogen is depleted during intense exercise and replenished by consuming ___ after training.',                                                                        'carbohydrates',                                     'Post-workout carbohydrate intake replenishes muscle glycogen stores, restoring energy for subsequent training sessions and supporting overall recovery.',                                                                                                                            4, null),

  -- L15: Fats Explained (33000057-33000060)
  ('33000057-0000-0000-0000-000000000000', '22000015-0000-0000-0000-000000000000', 'multiple_choice', 'Which type of fat is most associated with reduced cardiovascular disease risk?','Monounsaturated fats (olive oil, avocados)',   'Monounsaturated fats reduce LDL (bad) cholesterol while maintaining HDL (good) cholesterol. The Mediterranean diet, rich in these fats, is associated with excellent heart health.',                                                                                        1, null),
  ('33000058-0000-0000-0000-000000000000', '22000015-0000-0000-0000-000000000000', 'true_false',      'Dietary fat is essential for producing hormones including testosterone.',  'true',                                              'Fats are essential for producing steroid hormones including testosterone, estrogen, and cortisol. Very low-fat diets impair hormone production and can reduce testosterone levels.',                                                                                              2, null),
  ('33000059-0000-0000-0000-000000000000', '22000015-0000-0000-0000-000000000000', 'multiple_choice', 'Trans fats are harmful primarily because they:',                         'Raise LDL cholesterol and lower HDL cholesterol simultaneously','Trans fats have a uniquely damaging lipid effect — they raise bad LDL and lower good HDL simultaneously, significantly increasing cardiovascular disease risk.',                                                                                                                  3, null),
  ('33000060-0000-0000-0000-000000000000', '22000015-0000-0000-0000-000000000000', 'fill_blank',      'Omega-___ fatty acids, found in fatty fish and flaxseed, are essential for reducing inflammation.',                                                                          '3',                                                 'Omega-3 fatty acids (EPA and DHA) are essential, anti-inflammatory fats the body cannot synthesize. They support brain function, cardiovascular health, and muscle recovery.',                                                                                                      4, null),

  -- L16: Training Frequency (33000061-33000064)
  ('33000061-0000-0000-0000-000000000000', '22000016-0000-0000-0000-000000000000', 'multiple_choice', 'For natural lifters, the optimal training frequency per muscle group per week is:','2 times per week',                        'Research consistently shows that 2× per week per muscle group is optimal for most natural lifters, providing adequate stimulus while allowing sufficient recovery.',                                                                                                              1, null),
  ('33000062-0000-0000-0000-000000000000', '22000016-0000-0000-0000-000000000000', 'true_false',      'Training a muscle more frequently always leads to greater muscle growth.', 'false',                                             'Training frequency beyond recovery capacity leads to accumulated fatigue and overtraining. More is only better up to the threshold where adequate recovery remains possible.',                                                                                                      2, null),
  ('33000063-0000-0000-0000-000000000000', '22000016-0000-0000-0000-000000000000', 'multiple_choice', 'Which factor most influences how quickly a muscle recovers between sessions?','Volume and intensity of the previous training session','Recovery time is primarily dictated by how much muscular damage and systemic fatigue was accumulated. Higher volume and intensity = longer recovery requirement.',                                                                                                      3, null),
  ('33000064-0000-0000-0000-000000000000', '22000016-0000-0000-0000-000000000000', 'fill_blank',      'Research suggests the minimum effective training volume for hypertrophy is approximately ___ sets per muscle group per week.',                                                '10',                                                '10–20 sets per muscle per week is the effective hypertrophy range. Below 10 sets, stimulus is often insufficient. Individual responses vary based on training history.',                                                                                                          4, null),

  -- L17: Workout Splits (33000065-33000068)
  ('33000065-0000-0000-0000-000000000000', '22000017-0000-0000-0000-000000000000', 'multiple_choice', 'A Push/Pull/Legs (PPL) split organizes training by:',                   'Movement pattern — pushing, pulling, and leg exercises','PPL groups exercises by movement pattern: push (chest/shoulders/triceps), pull (back/biceps), and legs (quads/hamstrings/glutes). This allows 6× weekly frequency with good recovery.',                                                                                         1, null),
  ('33000066-0000-0000-0000-000000000000', '22000017-0000-0000-0000-000000000000', 'true_false',      'A full-body workout 3 times per week is a valid and effective training approach.','true',                                    'Full-body training 3× per week hits each muscle group twice to three times weekly, is time-efficient, and is especially effective for beginners and intermediate lifters.',                                                                                                      2, null),
  ('33000067-0000-0000-0000-000000000000', '22000017-0000-0000-0000-000000000000', 'multiple_choice', 'A traditional ''bro split'' typically involves:',                        'Training one muscle group per day, 5–6 days per week','Bro splits dedicate each day to a single muscle group (e.g., chest Monday, back Tuesday), which limits weekly training frequency per muscle to just once.',                                                                                                              3, null),
  ('33000068-0000-0000-0000-000000000000', '22000017-0000-0000-0000-000000000000', 'fill_blank',      'In an upper/lower split, each upper and lower body session is performed ___ times per week.',                                                                                '2',                                                 'A standard upper/lower split alternates upper and lower body across 4 days (2 upper + 2 lower), providing twice-weekly frequency for all major muscle groups.',                                                                                                                    4, null),

  -- L18: Periodization Basics (33000069-33000072)
  ('33000069-0000-0000-0000-000000000000', '22000018-0000-0000-0000-000000000000', 'multiple_choice', 'Periodization refers to:',                                              'Systematically varying training variables over time to maximize adaptation','Periodization is the planned manipulation of volume, intensity, and frequency over weeks and months to prevent plateaus and optimize long-term strength and muscle gains.',                                                                                        1, null),
  ('33000070-0000-0000-0000-000000000000', '22000018-0000-0000-0000-000000000000', 'true_false',      'Linear periodization involves adding weight to the bar every single training session.','true',                              'Linear periodization (linear progression) adds small weight increments each session — typically used by beginners who recover fast enough to progress every workout.',                                                                                                          2, null),
  ('33000071-0000-0000-0000-000000000000', '22000018-0000-0000-0000-000000000000', 'multiple_choice', 'A ''deload week'' in a training program means:',                         'Temporarily reducing volume or intensity to dissipate accumulated fatigue','A deload involves reducing volume by 40–50% while maintaining exercise selection and moderate intensity, allowing full fatigue dissipation while retaining fitness.',                                                                                                          3, null),
  ('33000072-0000-0000-0000-000000000000', '22000018-0000-0000-0000-000000000000', 'fill_blank',      'The three primary training variables manipulated in periodization are volume, intensity, and ___.',                                                                          'frequency',                                         'Periodization systematically manipulates volume (sets × reps), intensity (% of 1RM), and frequency (sessions per week/muscle) in planned waves to optimize adaptation.',                                                                                                          4, null),

  -- L19: Why Sleep Matters (33000073-33000076)
  ('33000073-0000-0000-0000-000000000000', '22000019-0000-0000-0000-000000000000', 'multiple_choice', 'When does the majority of muscle repair and growth occur?',              'During deep sleep',                                 'Growth hormone is primarily secreted during deep (slow-wave) sleep. Muscle protein synthesis also peaks during sleep, making 7–9 hours of quality sleep critical for gains.',                                                                                                    1, null),
  ('33000074-0000-0000-0000-000000000000', '22000019-0000-0000-0000-000000000000', 'true_false',      '5 hours of sleep per night is sufficient for optimal muscle growth and recovery.','false',                                  'Research recommends 7–9 hours for adults. Less than 7 hours impairs GH release, reduces testosterone, increases cortisol, and significantly slows muscle recovery.',                                                                                                              2, null),
  ('33000075-0000-0000-0000-000000000000', '22000019-0000-0000-0000-000000000000', 'multiple_choice', 'Chronically sleeping less than 6 hours per night is associated with:',  'Reduced testosterone, impaired recovery, and increased fat gain','Chronic sleep deprivation dramatically impairs anabolic hormone production, reduces muscle protein synthesis, elevates cortisol, and increases fat storage and hunger hormones.',                                                                                              3, null),
  ('33000076-0000-0000-0000-000000000000', '22000019-0000-0000-0000-000000000000', 'fill_blank',      'The sleep stage when most growth hormone is released is called ___ sleep.','deep',                                          'Deep sleep (slow-wave sleep, stages 3–4) is when the pituitary releases most daily growth hormone — essential for muscle repair, fat metabolism, and immune function.',                                                                                                          4, null),

  -- L20: Active Recovery (33000077-33000080)
  ('33000077-0000-0000-0000-000000000000', '22000020-0000-0000-0000-000000000000', 'multiple_choice', 'Active recovery refers to:',                                            'Light, low-intensity movement to enhance blood flow on rest days','Active recovery — light walking, swimming, yoga — improves blood flow and nutrient delivery to recovering muscles without creating new damage or delaying recovery.',                                                                                                          1, null),
  ('33000078-0000-0000-0000-000000000000', '22000020-0000-0000-0000-000000000000', 'true_false',      'Muscle soreness (DOMS) always indicates that you had an effective workout.','false',                                        'DOMS indicates muscle damage, which can be a growth stimulus — but it''s not required. Absence of soreness doesn''t mean a workout was ineffective. Metabolic stress also drives growth.',                                                                                    2, null),
  ('33000079-0000-0000-0000-000000000000', '22000020-0000-0000-0000-000000000000', 'multiple_choice', 'Which activity is most appropriate for active recovery between intense training sessions?','A 20-minute light walk or easy cycling at low intensity','Light movement at 30–40% of maximum effort promotes blood flow and reduces muscle stiffness without creating new muscular damage that delays recovery.',                                                                                              3, null),
  ('33000080-0000-0000-0000-000000000000', '22000020-0000-0000-0000-000000000000', 'fill_blank',      'Foam rolling is a form of self-myofascial ___ that reduces muscle tightness and improves range of motion.',                                                                  'release',                                           'Self-myofascial release (SMR) applies targeted pressure to tight spots in muscle fascia, helping break up adhesions and reducing tightness to improve movement quality.',                                                                                                          4, null),

  -- L21: Deload Weeks (33000081-33000084)
  ('33000081-0000-0000-0000-000000000000', '22000021-0000-0000-0000-000000000000', 'multiple_choice', 'The primary purpose of a programmed deload week is:',                   'To let accumulated fatigue dissipate while maintaining fitness adaptations','Deload weeks are planned recovery periods where reduced training clears fatigue, revealing the fitness gains made during the preceding training block.',                                                                                                              1, null),
  ('33000082-0000-0000-0000-000000000000', '22000021-0000-0000-0000-000000000000', 'true_false',      'During a deload, you should stop training completely.',                 'false',                                             'A deload involves reduced volume (typically 40–60% of normal), not complete rest. Light training maintains movement patterns, neural adaptations, and tissue blood flow.',                                                                                                      2, null),
  ('33000083-0000-0000-0000-000000000000', '22000021-0000-0000-0000-000000000000', 'multiple_choice', 'How often should most intermediate lifters schedule a deload week?',     'Every 4–8 weeks',                                   'Most intermediate+ lifters benefit from a deload every 4–8 weeks depending on training intensity and individual recovery capacity. Beginners often need them less frequently.',                                                                                                  3, null),
  ('33000084-0000-0000-0000-000000000000', '22000021-0000-0000-0000-000000000000', 'fill_blank',      'During a deload, training volume is typically reduced to approximately ___% of normal volume.',                                                                              '50',                                                'A standard deload performs normal exercises at ~50% of usual volume (half the sets) with the same or slightly lighter weights, providing active recovery while staying in the gym.',                                                                                                4, null),

  -- L22: HIIT vs Steady-State (33000085-33000088)
  ('33000085-0000-0000-0000-000000000000', '22000022-0000-0000-0000-000000000000', 'multiple_choice', 'HIIT stands for:',                                                       'High-Intensity Interval Training',                  'HIIT alternates between near-maximum effort intervals and recovery periods, typically in work-to-rest ratios like 20s on/40s off, stimulating both aerobic and anaerobic systems.',                                                                                          1, null),
  ('33000086-0000-0000-0000-000000000000', '22000022-0000-0000-0000-000000000000', 'true_false',      'Steady-state cardio burns more total calories per session than HIIT of equal duration.','false',                            'HIIT burns significantly more calories per unit time due to higher intensity and EPOC — the afterburn effect that continues elevating metabolism for hours post-exercise.',                                                                                                      2, null),
  ('33000087-0000-0000-0000-000000000000', '22000022-0000-0000-0000-000000000000', 'multiple_choice', 'The main advantage of steady-state cardio over HIIT is:',               'Lower injury risk and less interference with strength training recovery','Steady-state cardio creates less physiological stress and interferes less with strength training recovery, making it more sustainable and safer for frequent use.',                                                                                                          3, null),
  ('33000088-0000-0000-0000-000000000000', '22000022-0000-0000-0000-000000000000', 'fill_blank',      'The scientific term for the ''afterburn effect'' — elevated calorie burn after HIIT — is ___.',                                                                              'EPOC',                                              'EPOC (Excess Post-exercise Oxygen Consumption) describes the elevated metabolic rate following intense exercise as the body restores oxygen stores, repairs tissue, and returns to homeostasis.',                                                                                    4, null),

  -- L23: VO2 Max (33000089-33000092)
  ('33000089-0000-0000-0000-000000000000', '22000023-0000-0000-0000-000000000000', 'multiple_choice', 'VO2 max is a measure of:',                                               'The maximum volume of oxygen the body can utilize during intense exercise','VO2 max (maximal oxygen uptake) is the gold standard of cardiovascular fitness — it reflects the combined capacity of heart, lungs, and muscles to deliver and use oxygen.',                                                                                              1, null),
  ('33000090-0000-0000-0000-000000000000', '22000023-0000-0000-0000-000000000000', 'true_false',      'VO2 max cannot be meaningfully improved through training.',              'false',                                             'VO2 max can improve by 10–20% or more through consistent aerobic training, especially HIIT and tempo runs at 70–85% of maximum effort over weeks and months.',                                                                                                                  2, null),
  ('33000091-0000-0000-0000-000000000000', '22000023-0000-0000-0000-000000000000', 'multiple_choice', 'What type of training most effectively improves VO2 max?',               'High-intensity intervals at 90–100% of maximum effort','Training at or near VO2 max intensity provides the greatest cardiac and pulmonary stimulus, improving stroke volume, cardiac output, and oxygen delivery to muscles.',                                                                                                  3, null),
  ('33000092-0000-0000-0000-000000000000', '22000023-0000-0000-0000-000000000000', 'fill_blank',      'A higher VO2 max is generally associated with ___ cardiovascular fitness.','better',                                        'VO2 max is the single best indicator of aerobic fitness. Elite endurance athletes have VO2 max values (80+ ml/kg/min) more than double those of sedentary individuals (~35 ml/kg/min).',                                                                                      4, null),

  -- L24: Cardio & Muscle (33000093-33000096)
  ('33000093-0000-0000-0000-000000000000', '22000024-0000-0000-0000-000000000000', 'multiple_choice', 'The ''interference effect'' in concurrent training refers to:',          'Excessive cardio potentially reducing strength and muscle gains','High volumes of cardio (especially endurance training) activate AMPK signaling, which can inhibit mTOR — the primary pathway for muscle protein synthesis and hypertrophy.',                                                                                              1, null),
  ('33000094-0000-0000-0000-000000000000', '22000024-0000-0000-0000-000000000000', 'true_false',      'Combining cardio and strength training in the same program is always harmful to muscle gains.','false',                     'When programmed correctly, concurrent training works well. The interference effect is mainly problematic at very high cardio volumes. Most lifters can include moderate cardio safely.',                                                                                        2, null),
  ('33000095-0000-0000-0000-000000000000', '22000024-0000-0000-0000-000000000000', 'multiple_choice', 'The best type of cardio for preserving muscle mass while improving fitness is:','Shorter, high-intensity sessions like HIIT (20–30 minutes)','Short, intense cardio sessions minimize catabolic stress duration while maintaining cardiovascular benefits. Excessive long-duration steady-state cardio is more muscle-wasting.',                                                                                              3, null),
  ('33000096-0000-0000-0000-000000000000', '22000024-0000-0000-0000-000000000000', 'fill_blank',      'To minimize interference between cardio and strength training, perform them on ___ days when possible.',                                                                     'separate',                                          'Performing cardio and strength training on separate days allows complete recovery between sessions, minimizing the AMPK-mTOR interference effect on muscle growth signaling.',                                                                                                      4, null),

  -- L25: Creatine & Supplements (33000097-33000100)
  ('33000097-0000-0000-0000-000000000000', '22000025-0000-0000-0000-000000000000', 'multiple_choice', 'Creatine monohydrate improves performance by:',                          'Increasing phosphocreatine stores to rapidly regenerate ATP','Creatine increases phosphocreatine (PCr) stores in muscles, allowing faster ATP regeneration during short, high-intensity bursts like heavy sets and sprints.',                                                                                                              1, null),
  ('33000098-0000-0000-0000-000000000000', '22000025-0000-0000-0000-000000000000', 'true_false',      'Creatine is a steroid and is banned by the Olympic Committee.',           'false',                                             'Creatine is a naturally occurring compound found in meat and fish. It is NOT a steroid, is not banned in any sport including the Olympics, and is one of the most researched safe supplements.',                                                                                  2, null),
  ('33000099-0000-0000-0000-000000000000', '22000025-0000-0000-0000-000000000000', 'multiple_choice', 'The standard daily maintenance dose of creatine monohydrate is:',        '3–5 grams per day',                                 '3–5g/day maintains muscle creatine saturation after the initial loading phase (optional). Taking more provides no additional benefit once muscle stores are fully saturated.',                                                                                                    3, null),
  ('33000100-0000-0000-0000-000000000000', '22000025-0000-0000-0000-000000000000', 'fill_blank',      'Protein powder is simply a convenient ___ source — it has no magical properties beyond providing dietary protein.',                                                          'food',                                              'Protein powder is a concentrated food supplement. Its benefits come entirely from providing dietary protein — the same as eating chicken or eggs, just more convenient.',                                                                                                          4, null),

  -- L26: Caloric Surplus & Deficit (33000101-33000104)
  ('33000101-0000-0000-0000-000000000000', '22000026-0000-0000-0000-000000000000', 'multiple_choice', 'A caloric surplus means:',                                               'Consuming more calories than you burn each day',    'A caloric surplus provides the extra energy needed to support muscle growth. Without excess calories, building significant muscle mass is extremely difficult for most people.',                                                                                                1, null),
  ('33000102-0000-0000-0000-000000000000', '22000026-0000-0000-0000-000000000000', 'true_false',      'It is impossible to build muscle and lose fat at the same time.',        'false',                                             'Body recomposition — simultaneously building muscle while losing fat — is possible, especially for beginners, those returning from a break, or individuals with higher body fat percentages.',                                                                                    2, null),
  ('33000103-0000-0000-0000-000000000000', '22000026-0000-0000-0000-000000000000', 'multiple_choice', 'For a ''lean bulk'' (minimizing fat gain while building muscle), the recommended daily surplus is:','200–300 calories above maintenance','A modest 200–300 calorie surplus (~5–10% above maintenance) provides sufficient energy for muscle growth while minimizing unnecessary fat accumulation.',                                                                                              3, null),
  ('33000104-0000-0000-0000-000000000000', '22000026-0000-0000-0000-000000000000', 'fill_blank',      'TDEE stands for Total Daily ___ Expenditure — your body''s total daily calorie burn.',                                                                                       'Energy',                                            'TDEE is the total calories burned per day, including BMR (basal metabolic rate) plus all activity. It represents your caloric maintenance level — the baseline for bulking or cutting.',                                                                                          4, null),

  -- L27: Meal Timing (33000105-33000108)
  ('33000105-0000-0000-0000-000000000000', '22000027-0000-0000-0000-000000000000', 'multiple_choice', 'The post-workout ''anabolic window'' for nutrition timing is:',           'Less critical than total daily protein and calorie intake','Research shows the anabolic window is much broader than once believed — hours rather than minutes. Total daily nutrition matters far more than exact post-workout timing.',                                                                                                  1, null),
  ('33000106-0000-0000-0000-000000000000', '22000027-0000-0000-0000-000000000000', 'true_false',      'Consuming protein before bed can support overnight muscle protein synthesis.','true',                                        'Slow-digesting casein protein (cottage cheese, Greek yogurt) provides a steady amino acid supply throughout sleep, supporting overnight muscle protein synthesis during the 7–9 hour fast.',                                                                                      2, null),
  ('33000107-0000-0000-0000-000000000000', '22000027-0000-0000-0000-000000000000', 'multiple_choice', 'For optimal muscle protein synthesis throughout the day, you should aim for:','3–5 protein-containing meals spread throughout the day','Spreading protein across 3–5 meals consistently triggers the leucine threshold (2–3g leucine per meal) needed to maximally stimulate muscle protein synthesis multiple times daily.',                                                                                              3, null),
  ('33000108-0000-0000-0000-000000000000', '22000027-0000-0000-0000-000000000000', 'fill_blank',      'Consuming ___ to 60 grams of carbohydrates 1–2 hours before training can improve high-intensity performance.',                                                               '30',                                                '30–60g of pre-workout carbohydrates provides readily available glucose for high-intensity effort and tops off muscle glycogen stores for optimal training performance.',                                                                                                          4, null);

-- =============================================================================
-- 5. QUESTION CHOICES (220 rows — 4 per MC/image_match question, 55 questions)
-- =============================================================================
insert into public.question_choices (id, question_id, label, is_correct, sort_order) values

  -- Q01: What is the primary purpose of resistance training?
  ('44000001-0000-0000-0000-000000000000', '33000001-0000-0000-0000-000000000000', 'Build muscle strength and size',       true,  1),
  ('44000002-0000-0000-0000-000000000000', '33000001-0000-0000-0000-000000000000', 'Improve cardiovascular endurance',     false, 2),
  ('44000003-0000-0000-0000-000000000000', '33000001-0000-0000-0000-000000000000', 'Increase flexibility and mobility',    false, 3),
  ('44000004-0000-0000-0000-000000000000', '33000001-0000-0000-0000-000000000000', 'Burn fat through aerobic metabolism',  false, 4),

  -- Q03: Hypertrophy is the scientific term for:
  ('44000005-0000-0000-0000-000000000000', '33000003-0000-0000-0000-000000000000', 'Muscle fiber size increase',           true,  1),
  ('44000006-0000-0000-0000-000000000000', '33000003-0000-0000-0000-000000000000', 'Increase in muscle fiber count',       false, 2),
  ('44000007-0000-0000-0000-000000000000', '33000003-0000-0000-0000-000000000000', 'Reduction in body fat percentage',     false, 3),
  ('44000008-0000-0000-0000-000000000000', '33000003-0000-0000-0000-000000000000', 'Improvement in muscular endurance',    false, 4),

  -- Q05: What is one complete movement of an exercise called?
  ('44000009-0000-0000-0000-000000000000', '33000005-0000-0000-0000-000000000000', 'A repetition (rep)',                   true,  1),
  ('44000010-0000-0000-0000-000000000000', '33000005-0000-0000-0000-000000000000', 'A set',                                false, 2),
  ('44000011-0000-0000-0000-000000000000', '33000005-0000-0000-0000-000000000000', 'A superset',                           false, 3),
  ('44000012-0000-0000-0000-000000000000', '33000005-0000-0000-0000-000000000000', 'A circuit',                            false, 4),

  -- Q07: For building muscle size (hypertrophy), the optimal rep range is:
  ('44000013-0000-0000-0000-000000000000', '33000007-0000-0000-0000-000000000000', '8–12 reps',                            true,  1),
  ('44000014-0000-0000-0000-000000000000', '33000007-0000-0000-0000-000000000000', '1–5 reps',                             false, 2),
  ('44000015-0000-0000-0000-000000000000', '33000007-0000-0000-0000-000000000000', '20–30 reps',                           false, 3),
  ('44000016-0000-0000-0000-000000000000', '33000007-0000-0000-0000-000000000000', '15–20 reps',                           false, 4),

  -- Q09: Progressive overload means:
  ('44000017-0000-0000-0000-000000000000', '33000009-0000-0000-0000-000000000000', 'Gradually increasing training stress over time',         true,  1),
  ('44000018-0000-0000-0000-000000000000', '33000009-0000-0000-0000-000000000000', 'Adding as much weight as possible every session',        false, 2),
  ('44000019-0000-0000-0000-000000000000', '33000009-0000-0000-0000-000000000000', 'Training to complete muscular failure every set',        false, 3),
  ('44000020-0000-0000-0000-000000000000', '33000009-0000-0000-0000-000000000000', 'Changing exercises every workout to confuse the muscles', false, 4),

  -- Q11: The safest way to apply progressive overload as a beginner is:
  ('44000021-0000-0000-0000-000000000000', '33000011-0000-0000-0000-000000000000', 'Add 2.5–5 lbs when you complete all reps with good form', true,  1),
  ('44000022-0000-0000-0000-000000000000', '33000011-0000-0000-0000-000000000000', 'Double the weight every week to accelerate progress',     false, 2),
  ('44000023-0000-0000-0000-000000000000', '33000011-0000-0000-0000-000000000000', 'Train to failure on every set',                           false, 3),
  ('44000024-0000-0000-0000-000000000000', '33000011-0000-0000-0000-000000000000', 'Switch exercises every session to keep progressing',       false, 4),

  -- Q13: Which muscle is primarily responsible for shoulder abduction?
  ('44000025-0000-0000-0000-000000000000', '33000013-0000-0000-0000-000000000000', 'Deltoid',           true,  1),
  ('44000026-0000-0000-0000-000000000000', '33000013-0000-0000-0000-000000000000', 'Trapezius',         false, 2),
  ('44000027-0000-0000-0000-000000000000', '33000013-0000-0000-0000-000000000000', 'Pectoralis major',  false, 3),
  ('44000028-0000-0000-0000-000000000000', '33000013-0000-0000-0000-000000000000', 'Rotator cuff',      false, 4),

  -- Q15: The pectoralis major's primary function is:
  ('44000029-0000-0000-0000-000000000000', '33000015-0000-0000-0000-000000000000', 'Horizontal shoulder adduction and flexion', true,  1),
  ('44000030-0000-0000-0000-000000000000', '33000015-0000-0000-0000-000000000000', 'Shoulder abduction and elevation',          false, 2),
  ('44000031-0000-0000-0000-000000000000', '33000015-0000-0000-0000-000000000000', 'Elbow flexion and forearm supination',      false, 3),
  ('44000032-0000-0000-0000-000000000000', '33000015-0000-0000-0000-000000000000', 'Spinal extension and rotation',             false, 4),

  -- Q16 (IM): Which back muscle is known as the 'wings'?
  ('44000033-0000-0000-0000-000000000000', '33000016-0000-0000-0000-000000000000', 'Latissimus dorsi',  true,  1),
  ('44000034-0000-0000-0000-000000000000', '33000016-0000-0000-0000-000000000000', 'Trapezius',         false, 2),
  ('44000035-0000-0000-0000-000000000000', '33000016-0000-0000-0000-000000000000', 'Rhomboids',         false, 3),
  ('44000036-0000-0000-0000-000000000000', '33000016-0000-0000-0000-000000000000', 'Erector spinae',    false, 4),

  -- Q17: The quadriceps group consists of how many individual muscles?
  ('44000037-0000-0000-0000-000000000000', '33000017-0000-0000-0000-000000000000', '4 muscles',  true,  1),
  ('44000038-0000-0000-0000-000000000000', '33000017-0000-0000-0000-000000000000', '2 muscles',  false, 2),
  ('44000039-0000-0000-0000-000000000000', '33000017-0000-0000-0000-000000000000', '3 muscles',  false, 3),
  ('44000040-0000-0000-0000-000000000000', '33000017-0000-0000-0000-000000000000', '5 muscles',  false, 4),

  -- Q19: Which muscle is primarily targeted by a standing calf raise?
  ('44000041-0000-0000-0000-000000000000', '33000019-0000-0000-0000-000000000000', 'Gastrocnemius',  true,  1),
  ('44000042-0000-0000-0000-000000000000', '33000019-0000-0000-0000-000000000000', 'Soleus',         false, 2),
  ('44000043-0000-0000-0000-000000000000', '33000019-0000-0000-0000-000000000000', 'Tibialis anterior', false, 3),
  ('44000044-0000-0000-0000-000000000000', '33000019-0000-0000-0000-000000000000', 'Peroneus longus', false, 4),

  -- Q21: The core is best described as:
  ('44000045-0000-0000-0000-000000000000', '33000021-0000-0000-0000-000000000000', 'Muscles around the spine and pelvis providing stability', true,  1),
  ('44000046-0000-0000-0000-000000000000', '33000021-0000-0000-0000-000000000000', 'Only the rectus abdominis (six-pack muscles)',            false, 2),
  ('44000047-0000-0000-0000-000000000000', '33000021-0000-0000-0000-000000000000', 'The chest, shoulders, and upper back',                   false, 3),
  ('44000048-0000-0000-0000-000000000000', '33000021-0000-0000-0000-000000000000', 'The hip flexors and glutes only',                        false, 4),

  -- Q23: Which deep core muscle acts as the body's natural weight belt?
  ('44000049-0000-0000-0000-000000000000', '33000023-0000-0000-0000-000000000000', 'Transverse abdominis', true,  1),
  ('44000050-0000-0000-0000-000000000000', '33000023-0000-0000-0000-000000000000', 'Rectus abdominis',     false, 2),
  ('44000051-0000-0000-0000-000000000000', '33000023-0000-0000-0000-000000000000', 'Internal oblique',     false, 3),
  ('44000052-0000-0000-0000-000000000000', '33000023-0000-0000-0000-000000000000', 'Multifidus',           false, 4),

  -- Q25: Type I (slow-twitch) muscle fibers are characterized by:
  ('44000053-0000-0000-0000-000000000000', '33000025-0000-0000-0000-000000000000', 'High endurance, low force output',   true,  1),
  ('44000054-0000-0000-0000-000000000000', '33000025-0000-0000-0000-000000000000', 'High force output, low endurance',   false, 2),
  ('44000055-0000-0000-0000-000000000000', '33000025-0000-0000-0000-000000000000', 'Large size and explosive power',     false, 3),
  ('44000056-0000-0000-0000-000000000000', '33000025-0000-0000-0000-000000000000', 'Fast contraction, high strength',    false, 4),

  -- Q27: Which type of training best recruits fast-twitch (Type II) muscle fibers?
  ('44000057-0000-0000-0000-000000000000', '33000027-0000-0000-0000-000000000000', 'Heavy lifting and explosive power movements',    true,  1),
  ('44000058-0000-0000-0000-000000000000', '33000027-0000-0000-0000-000000000000', 'Long-distance jogging at low intensity',         false, 2),
  ('44000059-0000-0000-0000-000000000000', '33000027-0000-0000-0000-000000000000', 'High-rep sets with light weights',               false, 3),
  ('44000060-0000-0000-0000-000000000000', '33000027-0000-0000-0000-000000000000', 'Yoga and static stretching',                     false, 4),

  -- Q29: During a squat, the knees should:
  ('44000061-0000-0000-0000-000000000000', '33000029-0000-0000-0000-000000000000', 'Track over the toes throughout the movement',     true,  1),
  ('44000062-0000-0000-0000-000000000000', '33000029-0000-0000-0000-000000000000', 'Cave inward to recruit more glutes',              false, 2),
  ('44000063-0000-0000-0000-000000000000', '33000029-0000-0000-0000-000000000000', 'Lock out completely at the bottom position',      false, 3),
  ('44000064-0000-0000-0000-000000000000', '33000029-0000-0000-0000-000000000000', 'Stay behind the toes at all times',               false, 4),

  -- Q31: The primary muscles targeted in a back squat are:
  ('44000065-0000-0000-0000-000000000000', '33000031-0000-0000-0000-000000000000', 'Quadriceps, glutes, and hamstrings',              true,  1),
  ('44000066-0000-0000-0000-000000000000', '33000031-0000-0000-0000-000000000000', 'Calves, hip flexors, and lower back',             false, 2),
  ('44000067-0000-0000-0000-000000000000', '33000031-0000-0000-0000-000000000000', 'Chest, shoulders, and triceps',                  false, 3),
  ('44000068-0000-0000-0000-000000000000', '33000031-0000-0000-0000-000000000000', 'Hamstrings and calves only',                      false, 4),

  -- Q33: In the deadlift setup, the barbell should be positioned:
  ('44000069-0000-0000-0000-000000000000', '33000033-0000-0000-0000-000000000000', 'Over the mid-foot',                              true,  1),
  ('44000070-0000-0000-0000-000000000000', '33000033-0000-0000-0000-000000000000', 'Against the shins at setup',                     false, 2),
  ('44000071-0000-0000-0000-000000000000', '33000033-0000-0000-0000-000000000000', 'As far forward as possible',                     false, 3),
  ('44000072-0000-0000-0000-000000000000', '33000033-0000-0000-0000-000000000000', 'Directly under the shoulders',                   false, 4),

  -- Q35: The deadlift is called a 'hip hinge' because:
  ('44000073-0000-0000-0000-000000000000', '33000035-0000-0000-0000-000000000000', 'The primary movement is hip extension, driving hips forward', true,  1),
  ('44000074-0000-0000-0000-000000000000', '33000035-0000-0000-0000-000000000000', 'The knees bend deeply like a squat',              false, 2),
  ('44000075-0000-0000-0000-000000000000', '33000035-0000-0000-0000-000000000000', 'The hips rotate externally throughout',           false, 3),
  ('44000076-0000-0000-0000-000000000000', '33000035-0000-0000-0000-000000000000', 'The movement originates from the lower back',     false, 4),

  -- Q37: The proper grip width for a standard barbell bench press is:
  ('44000077-0000-0000-0000-000000000000', '33000037-0000-0000-0000-000000000000', 'Slightly wider than shoulder-width',              true,  1),
  ('44000078-0000-0000-0000-000000000000', '33000037-0000-0000-0000-000000000000', 'As wide as possible on the bar',                  false, 2),
  ('44000079-0000-0000-0000-000000000000', '33000037-0000-0000-0000-000000000000', 'Narrow grip with hands touching',                 false, 3),
  ('44000080-0000-0000-0000-000000000000', '33000037-0000-0000-0000-000000000000', 'Exactly shoulder-width apart',                    false, 4),

  -- Q39: Retracting your shoulder blades during the bench press primarily:
  ('44000081-0000-0000-0000-000000000000', '33000039-0000-0000-0000-000000000000', 'Creates a stable base and protects the shoulder joint', true,  1),
  ('44000082-0000-0000-0000-000000000000', '33000039-0000-0000-0000-000000000000', 'Increases the range of motion of the press',      false, 2),
  ('44000083-0000-0000-0000-000000000000', '33000039-0000-0000-0000-000000000000', 'Reduces tricep activation',                       false, 3),
  ('44000084-0000-0000-0000-000000000000', '33000039-0000-0000-0000-000000000000', 'Allows a wider grip to be used',                  false, 4),

  -- Q41: Pull-ups primarily target which muscle?
  ('44000085-0000-0000-0000-000000000000', '33000041-0000-0000-0000-000000000000', 'Latissimus dorsi',   true,  1),
  ('44000086-0000-0000-0000-000000000000', '33000041-0000-0000-0000-000000000000', 'Biceps brachii',     false, 2),
  ('44000087-0000-0000-0000-000000000000', '33000041-0000-0000-0000-000000000000', 'Rear deltoid',       false, 3),
  ('44000088-0000-0000-0000-000000000000', '33000041-0000-0000-0000-000000000000', 'Trapezius',          false, 4),

  -- Q43: During a row, you should initiate the movement by:
  ('44000089-0000-0000-0000-000000000000', '33000043-0000-0000-0000-000000000000', 'Retracting the shoulder blade before bending the elbow', true,  1),
  ('44000090-0000-0000-0000-000000000000', '33000043-0000-0000-0000-000000000000', 'Bending the elbow first to engage the biceps',     false, 2),
  ('44000091-0000-0000-0000-000000000000', '33000043-0000-0000-0000-000000000000', 'Shrugging the shoulders upward',                  false, 3),
  ('44000092-0000-0000-0000-000000000000', '33000043-0000-0000-0000-000000000000', 'Arching the lower back strongly',                 false, 4),

  -- Q45: The three macronutrients are:
  ('44000093-0000-0000-0000-000000000000', '33000045-0000-0000-0000-000000000000', 'Protein, carbohydrates, and fats',                true,  1),
  ('44000094-0000-0000-0000-000000000000', '33000045-0000-0000-0000-000000000000', 'Vitamins, minerals, and water',                   false, 2),
  ('44000095-0000-0000-0000-000000000000', '33000045-0000-0000-0000-000000000000', 'Glucose, amino acids, and fatty acids',           false, 3),
  ('44000096-0000-0000-0000-000000000000', '33000045-0000-0000-0000-000000000000', 'Fiber, electrolytes, and antioxidants',           false, 4),

  -- Q47: The body's preferred immediate fuel source for high-intensity exercise is:
  ('44000097-0000-0000-0000-000000000000', '33000047-0000-0000-0000-000000000000', 'Carbohydrates',      true,  1),
  ('44000098-0000-0000-0000-000000000000', '33000047-0000-0000-0000-000000000000', 'Dietary fat',        false, 2),
  ('44000099-0000-0000-0000-000000000000', '33000047-0000-0000-0000-000000000000', 'Dietary protein',    false, 3),
  ('44000100-0000-0000-0000-000000000000', '33000047-0000-0000-0000-000000000000', 'Ketone bodies',      false, 4),

  -- Q49: The recommended daily protein intake for maximizing muscle growth is approximately:
  ('44000101-0000-0000-0000-000000000000', '33000049-0000-0000-0000-000000000000', '1.6–2.2 grams per kilogram of bodyweight',        true,  1),
  ('44000102-0000-0000-0000-000000000000', '33000049-0000-0000-0000-000000000000', '0.5–0.8 grams per kilogram of bodyweight',        false, 2),
  ('44000103-0000-0000-0000-000000000000', '33000049-0000-0000-0000-000000000000', '4–5 grams per kilogram of bodyweight',            false, 3),
  ('44000104-0000-0000-0000-000000000000', '33000049-0000-0000-0000-000000000000', '3–4 grams per kilogram of bodyweight',            false, 4),

  -- Q51: Which protein source is considered 'complete'?
  ('44000105-0000-0000-0000-000000000000', '33000051-0000-0000-0000-000000000000', 'Animal proteins like meat, eggs, and dairy',      true,  1),
  ('44000106-0000-0000-0000-000000000000', '33000051-0000-0000-0000-000000000000', 'Rice and beans combined',                         false, 2),
  ('44000107-0000-0000-0000-000000000000', '33000051-0000-0000-0000-000000000000', 'Wheat and oats',                                  false, 3),
  ('44000108-0000-0000-0000-000000000000', '33000051-0000-0000-0000-000000000000', 'Nuts and seeds',                                  false, 4),

  -- Q53: Glycogen is:
  ('44000109-0000-0000-0000-000000000000', '33000053-0000-0000-0000-000000000000', 'Stored carbohydrate in muscles and liver',        true,  1),
  ('44000110-0000-0000-0000-000000000000', '33000053-0000-0000-0000-000000000000', 'A type of dietary fat stored in adipose tissue',  false, 2),
  ('44000111-0000-0000-0000-000000000000', '33000053-0000-0000-0000-000000000000', 'A hormone released during exercise',              false, 3),
  ('44000112-0000-0000-0000-000000000000', '33000053-0000-0000-0000-000000000000', 'Stored protein in the muscles',                   false, 4),

  -- Q55: Which type of carbohydrate provides more sustained, steady energy?
  ('44000113-0000-0000-0000-000000000000', '33000055-0000-0000-0000-000000000000', 'Complex carbs like oats and sweet potato',        true,  1),
  ('44000114-0000-0000-0000-000000000000', '33000055-0000-0000-0000-000000000000', 'Simple sugars like candy and soda',               false, 2),
  ('44000115-0000-0000-0000-000000000000', '33000055-0000-0000-0000-000000000000', 'White bread and refined grains',                  false, 3),
  ('44000116-0000-0000-0000-000000000000', '33000055-0000-0000-0000-000000000000', 'Fruit juice and honey',                           false, 4),

  -- Q57: Which type of fat is most associated with reduced cardiovascular disease risk?
  ('44000117-0000-0000-0000-000000000000', '33000057-0000-0000-0000-000000000000', 'Monounsaturated fats (olive oil, avocados)',      true,  1),
  ('44000118-0000-0000-0000-000000000000', '33000057-0000-0000-0000-000000000000', 'Trans fats (margarine, fried foods)',             false, 2),
  ('44000119-0000-0000-0000-000000000000', '33000057-0000-0000-0000-000000000000', 'Saturated fats (butter, red meat)',               false, 3),
  ('44000120-0000-0000-0000-000000000000', '33000057-0000-0000-0000-000000000000', 'Polyunsaturated omega-6 fats from vegetable oils', false, 4),

  -- Q59: Trans fats are harmful primarily because they:
  ('44000121-0000-0000-0000-000000000000', '33000059-0000-0000-0000-000000000000', 'Raise LDL cholesterol and lower HDL cholesterol simultaneously', true,  1),
  ('44000122-0000-0000-0000-000000000000', '33000059-0000-0000-0000-000000000000', 'Cause immediate digestive problems',              false, 2),
  ('44000123-0000-0000-0000-000000000000', '33000059-0000-0000-0000-000000000000', 'Block protein absorption in the gut',             false, 3),
  ('44000124-0000-0000-0000-000000000000', '33000059-0000-0000-0000-000000000000', 'Reduce hormone production below healthy levels',  false, 4),

  -- Q61: For natural lifters, the optimal training frequency per muscle group per week is:
  ('44000125-0000-0000-0000-000000000000', '33000061-0000-0000-0000-000000000000', '2 times per week',   true,  1),
  ('44000126-0000-0000-0000-000000000000', '33000061-0000-0000-0000-000000000000', '1 time per week',    false, 2),
  ('44000127-0000-0000-0000-000000000000', '33000061-0000-0000-0000-000000000000', '5 times per week',   false, 3),
  ('44000128-0000-0000-0000-000000000000', '33000061-0000-0000-0000-000000000000', '7 times per week',   false, 4),

  -- Q63: Which factor most influences how quickly a muscle recovers between sessions?
  ('44000129-0000-0000-0000-000000000000', '33000063-0000-0000-0000-000000000000', 'Volume and intensity of the previous training session', true,  1),
  ('44000130-0000-0000-0000-000000000000', '33000063-0000-0000-0000-000000000000', 'The time of day the workout was performed',       false, 2),
  ('44000131-0000-0000-0000-000000000000', '33000063-0000-0000-0000-000000000000', 'The type of music listened to during training',   false, 3),
  ('44000132-0000-0000-0000-000000000000', '33000063-0000-0000-0000-000000000000', 'Whether the gym was air-conditioned',             false, 4),

  -- Q65: A Push/Pull/Legs (PPL) split organizes training by:
  ('44000133-0000-0000-0000-000000000000', '33000065-0000-0000-0000-000000000000', 'Movement pattern — pushing, pulling, and leg exercises', true,  1),
  ('44000134-0000-0000-0000-000000000000', '33000065-0000-0000-0000-000000000000', 'Individual muscle groups trained one per day',    false, 2),
  ('44000135-0000-0000-0000-000000000000', '33000065-0000-0000-0000-000000000000', 'Upper and lower body alternating each session',   false, 3),
  ('44000136-0000-0000-0000-000000000000', '33000065-0000-0000-0000-000000000000', 'Full body trained every session',                 false, 4),

  -- Q67: A traditional 'bro split' typically involves:
  ('44000137-0000-0000-0000-000000000000', '33000067-0000-0000-0000-000000000000', 'Training one muscle group per day, 5–6 days per week', true,  1),
  ('44000138-0000-0000-0000-000000000000', '33000067-0000-0000-0000-000000000000', 'Full-body workouts every day',                    false, 2),
  ('44000139-0000-0000-0000-000000000000', '33000067-0000-0000-0000-000000000000', 'Training all major lifts in one session',         false, 3),
  ('44000140-0000-0000-0000-000000000000', '33000067-0000-0000-0000-000000000000', 'Alternating upper and lower body each session',   false, 4),

  -- Q69: Periodization refers to:
  ('44000141-0000-0000-0000-000000000000', '33000069-0000-0000-0000-000000000000', 'Systematically varying training variables over time to maximize adaptation', true,  1),
  ('44000142-0000-0000-0000-000000000000', '33000069-0000-0000-0000-000000000000', 'Training the same way every session for consistency', false, 2),
  ('44000143-0000-0000-0000-000000000000', '33000069-0000-0000-0000-000000000000', 'Randomly changing exercises to prevent boredom', false, 3),
  ('44000144-0000-0000-0000-000000000000', '33000069-0000-0000-0000-000000000000', 'Following a fixed diet plan alongside training', false, 4),

  -- Q71: A 'deload week' in a training program means:
  ('44000145-0000-0000-0000-000000000000', '33000071-0000-0000-0000-000000000000', 'Temporarily reducing volume or intensity to dissipate accumulated fatigue', true,  1),
  ('44000146-0000-0000-0000-000000000000', '33000071-0000-0000-0000-000000000000', 'Completely stopping all training for seven days', false, 2),
  ('44000147-0000-0000-0000-000000000000', '33000071-0000-0000-0000-000000000000', 'Dramatically increasing training volume to break plateaus', false, 3),
  ('44000148-0000-0000-0000-000000000000', '33000071-0000-0000-0000-000000000000', 'Switching to only cardio for one week',           false, 4),

  -- Q73: When does the majority of muscle repair and growth occur?
  ('44000149-0000-0000-0000-000000000000', '33000073-0000-0000-0000-000000000000', 'During deep sleep',                               true,  1),
  ('44000150-0000-0000-0000-000000000000', '33000073-0000-0000-0000-000000000000', 'Immediately during the workout',                  false, 2),
  ('44000151-0000-0000-0000-000000000000', '33000073-0000-0000-0000-000000000000', 'Within 30 minutes of training',                  false, 3),
  ('44000152-0000-0000-0000-000000000000', '33000073-0000-0000-0000-000000000000', 'Only during REM sleep',                           false, 4),

  -- Q75: Chronically sleeping less than 6 hours per night is associated with:
  ('44000153-0000-0000-0000-000000000000', '33000075-0000-0000-0000-000000000000', 'Reduced testosterone, impaired recovery, and increased fat gain', true,  1),
  ('44000154-0000-0000-0000-000000000000', '33000075-0000-0000-0000-000000000000', 'Improved fat burning due to extended fasting',   false, 2),
  ('44000155-0000-0000-0000-000000000000', '33000075-0000-0000-0000-000000000000', 'No significant effect on body composition',      false, 3),
  ('44000156-0000-0000-0000-000000000000', '33000075-0000-0000-0000-000000000000', 'Increased growth hormone release during the day', false, 4),

  -- Q77: Active recovery refers to:
  ('44000157-0000-0000-0000-000000000000', '33000077-0000-0000-0000-000000000000', 'Light, low-intensity movement to enhance blood flow on rest days', true,  1),
  ('44000158-0000-0000-0000-000000000000', '33000077-0000-0000-0000-000000000000', 'Training at maximum intensity on days off',       false, 2),
  ('44000159-0000-0000-0000-000000000000', '33000077-0000-0000-0000-000000000000', 'Taking supplements to speed up recovery',         false, 3),
  ('44000160-0000-0000-0000-000000000000', '33000077-0000-0000-0000-000000000000', 'Sleeping 12 or more hours on rest days',          false, 4),

  -- Q79: Which activity is most appropriate for active recovery?
  ('44000161-0000-0000-0000-000000000000', '33000079-0000-0000-0000-000000000000', 'A 20-minute light walk or easy cycling at low intensity', true,  1),
  ('44000162-0000-0000-0000-000000000000', '33000079-0000-0000-0000-000000000000', 'A max-effort HIIT session',                       false, 2),
  ('44000163-0000-0000-0000-000000000000', '33000079-0000-0000-0000-000000000000', 'A heavy lower body strength session',             false, 3),
  ('44000164-0000-0000-0000-000000000000', '33000079-0000-0000-0000-000000000000', 'Complete bed rest for 24 hours',                  false, 4),

  -- Q81: The primary purpose of a programmed deload week is:
  ('44000165-0000-0000-0000-000000000000', '33000081-0000-0000-0000-000000000000', 'To let accumulated fatigue dissipate while maintaining fitness adaptations', true,  1),
  ('44000166-0000-0000-0000-000000000000', '33000081-0000-0000-0000-000000000000', 'To build maximum muscle in a short time',         false, 2),
  ('44000167-0000-0000-0000-000000000000', '33000081-0000-0000-0000-000000000000', 'To test your one-rep maxes across all lifts',     false, 3),
  ('44000168-0000-0000-0000-000000000000', '33000081-0000-0000-0000-000000000000', 'To completely rest and avoid the gym',            false, 4),

  -- Q83: How often should most intermediate lifters schedule a deload week?
  ('44000169-0000-0000-0000-000000000000', '33000083-0000-0000-0000-000000000000', 'Every 4–8 weeks',     true,  1),
  ('44000170-0000-0000-0000-000000000000', '33000083-0000-0000-0000-000000000000', 'Every 1–2 weeks',     false, 2),
  ('44000171-0000-0000-0000-000000000000', '33000083-0000-0000-0000-000000000000', 'Once per year',       false, 3),
  ('44000172-0000-0000-0000-000000000000', '33000083-0000-0000-0000-000000000000', 'Every 3 months',      false, 4),

  -- Q85: HIIT stands for:
  ('44000173-0000-0000-0000-000000000000', '33000085-0000-0000-0000-000000000000', 'High-Intensity Interval Training',                true,  1),
  ('44000174-0000-0000-0000-000000000000', '33000085-0000-0000-0000-000000000000', 'High-Impact Isometric Training',                  false, 2),
  ('44000175-0000-0000-0000-000000000000', '33000085-0000-0000-0000-000000000000', 'Heart-Integrated Isotonic Training',              false, 3),
  ('44000176-0000-0000-0000-000000000000', '33000085-0000-0000-0000-000000000000', 'Hypertrophy-Inducing Interval Technique',         false, 4),

  -- Q87: The main advantage of steady-state cardio over HIIT is:
  ('44000177-0000-0000-0000-000000000000', '33000087-0000-0000-0000-000000000000', 'Lower injury risk and less interference with strength training recovery', true,  1),
  ('44000178-0000-0000-0000-000000000000', '33000087-0000-0000-0000-000000000000', 'Burns more calories per minute than HIIT',        false, 2),
  ('44000179-0000-0000-0000-000000000000', '33000087-0000-0000-0000-000000000000', 'Produces a greater afterburn (EPOC) effect',      false, 3),
  ('44000180-0000-0000-0000-000000000000', '33000087-0000-0000-0000-000000000000', 'Builds more muscle than interval training',       false, 4),

  -- Q89: VO2 max is a measure of:
  ('44000181-0000-0000-0000-000000000000', '33000089-0000-0000-0000-000000000000', 'The maximum volume of oxygen the body can utilize during intense exercise', true,  1),
  ('44000182-0000-0000-0000-000000000000', '33000089-0000-0000-0000-000000000000', 'The total volume of air in the lungs at rest',    false, 2),
  ('44000183-0000-0000-0000-000000000000', '33000089-0000-0000-0000-000000000000', 'The heart rate variability during exercise',      false, 3),
  ('44000184-0000-0000-0000-000000000000', '33000089-0000-0000-0000-000000000000', 'The maximum breath-hold duration underwater',     false, 4),

  -- Q91: What type of training most effectively improves VO2 max?
  ('44000185-0000-0000-0000-000000000000', '33000091-0000-0000-0000-000000000000', 'High-intensity intervals at 90–100% of maximum effort', true,  1),
  ('44000186-0000-0000-0000-000000000000', '33000091-0000-0000-0000-000000000000', 'Long slow distance runs at 50% effort',           false, 2),
  ('44000187-0000-0000-0000-000000000000', '33000091-0000-0000-0000-000000000000', 'Heavy barbell squats and deadlifts',              false, 3),
  ('44000188-0000-0000-0000-000000000000', '33000091-0000-0000-0000-000000000000', 'Static stretching and mobility work',             false, 4),

  -- Q93: The 'interference effect' in concurrent training refers to:
  ('44000189-0000-0000-0000-000000000000', '33000093-0000-0000-0000-000000000000', 'Excessive cardio potentially reducing strength and muscle gains', true,  1),
  ('44000190-0000-0000-0000-000000000000', '33000093-0000-0000-0000-000000000000', 'Strength training improving running economy',     false, 2),
  ('44000191-0000-0000-0000-000000000000', '33000093-0000-0000-0000-000000000000', 'Cardio increasing muscle protein synthesis',      false, 3),
  ('44000192-0000-0000-0000-000000000000', '33000093-0000-0000-0000-000000000000', 'The positive synergy between cardio and weights', false, 4),

  -- Q95: The best type of cardio for preserving muscle mass while improving fitness is:
  ('44000193-0000-0000-0000-000000000000', '33000095-0000-0000-0000-000000000000', 'Shorter, high-intensity sessions like HIIT (20–30 minutes)', true,  1),
  ('44000194-0000-0000-0000-000000000000', '33000095-0000-0000-0000-000000000000', 'Marathon-length runs at low intensity',           false, 2),
  ('44000195-0000-0000-0000-000000000000', '33000095-0000-0000-0000-000000000000', '2+ hour steady-state cycling sessions daily',     false, 3),
  ('44000196-0000-0000-0000-000000000000', '33000095-0000-0000-0000-000000000000', 'Avoiding cardio entirely to maximize muscle',     false, 4),

  -- Q97: Creatine monohydrate improves performance by:
  ('44000197-0000-0000-0000-000000000000', '33000097-0000-0000-0000-000000000000', 'Increasing phosphocreatine stores to rapidly regenerate ATP', true,  1),
  ('44000198-0000-0000-0000-000000000000', '33000097-0000-0000-0000-000000000000', 'Directly increasing testosterone production',     false, 2),
  ('44000199-0000-0000-0000-000000000000', '33000097-0000-0000-0000-000000000000', 'Reducing muscle soreness after workouts',         false, 3),
  ('44000200-0000-0000-0000-000000000000', '33000097-0000-0000-0000-000000000000', 'Burning fat during exercise for fuel',            false, 4),

  -- Q99: The standard daily maintenance dose of creatine monohydrate is:
  ('44000201-0000-0000-0000-000000000000', '33000099-0000-0000-0000-000000000000', '3–5 grams per day',   true,  1),
  ('44000202-0000-0000-0000-000000000000', '33000099-0000-0000-0000-000000000000', '20–25 grams per day', false, 2),
  ('44000203-0000-0000-0000-000000000000', '33000099-0000-0000-0000-000000000000', '0.5–1 gram per day',  false, 3),
  ('44000204-0000-0000-0000-000000000000', '33000099-0000-0000-0000-000000000000', '10–15 grams per day', false, 4),

  -- Q101: A caloric surplus means:
  ('44000205-0000-0000-0000-000000000000', '33000101-0000-0000-0000-000000000000', 'Consuming more calories than you burn each day',  true,  1),
  ('44000206-0000-0000-0000-000000000000', '33000101-0000-0000-0000-000000000000', 'Eating exactly the same calories you burn',       false, 2),
  ('44000207-0000-0000-0000-000000000000', '33000101-0000-0000-0000-000000000000', 'Consuming fewer calories than you burn each day', false, 3),
  ('44000208-0000-0000-0000-000000000000', '33000101-0000-0000-0000-000000000000', 'Eating only high-quality whole food sources',     false, 4),

  -- Q103: For a 'lean bulk', the recommended daily surplus is:
  ('44000209-0000-0000-0000-000000000000', '33000103-0000-0000-0000-000000000000', '200–300 calories above maintenance',              true,  1),
  ('44000210-0000-0000-0000-000000000000', '33000103-0000-0000-0000-000000000000', '1000–1500 calories above maintenance',            false, 2),
  ('44000211-0000-0000-0000-000000000000', '33000103-0000-0000-0000-000000000000', '50–100 calories above maintenance',               false, 3),
  ('44000212-0000-0000-0000-000000000000', '33000103-0000-0000-0000-000000000000', '500–800 calories above maintenance',              false, 4),

  -- Q105: The post-workout 'anabolic window' for nutrition timing is:
  ('44000213-0000-0000-0000-000000000000', '33000105-0000-0000-0000-000000000000', 'Less critical than total daily protein and calorie intake', true,  1),
  ('44000214-0000-0000-0000-000000000000', '33000105-0000-0000-0000-000000000000', 'Exactly 30 minutes and cannot be missed',         false, 2),
  ('44000215-0000-0000-0000-000000000000', '33000105-0000-0000-0000-000000000000', 'The most important factor for muscle growth',     false, 3),
  ('44000216-0000-0000-0000-000000000000', '33000105-0000-0000-0000-000000000000', 'Only relevant for steroid users',                 false, 4),

  -- Q107: For optimal muscle protein synthesis throughout the day, you should aim for:
  ('44000217-0000-0000-0000-000000000000', '33000107-0000-0000-0000-000000000000', '3–5 protein-containing meals spread throughout the day', true,  1),
  ('44000218-0000-0000-0000-000000000000', '33000107-0000-0000-0000-000000000000', 'One large protein meal per day',                  false, 2),
  ('44000219-0000-0000-0000-000000000000', '33000107-0000-0000-0000-000000000000', 'Only consuming protein immediately post-workout', false, 3),
  ('44000220-0000-0000-0000-000000000000', '33000107-0000-0000-0000-000000000000', '8–10 small protein snacks throughout the day',    false, 4);
