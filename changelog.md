# Changelog

In order to receive a regrade on this submission you **must** fully answer the following. Incomplete or missing answers will result in no regrade. 

## 1. Clearly list all changes you made from your last submission to this submission.
- Fixed data representation in both visualizations by replacing synthetic ±2°C uncertainty with statistically grounded uncertainty using standard error and 95% confidence intervals.
- Improved the second visualization by adding uncertainty encoding (error bars) so that both charts consistently represent uncertainty.
- Added clearer contextual information explaining that the dataset is synthetic and how uncertainty is constructed and interpreted.
- Improved visual encoding clarity by ensuring that:
 - Line chart shows daily average temperature
 - Shaded area represents variability/uncertainty
- Bar chart includes uncertainty representation through confidence intervals
- Enhanced interactivity in the line chart by improving tooltip clarity and making hover interactions more informative.
- Improved labeling and titles for both charts to clearly indicate that the dataset is simulated and to avoid misinterpretation of values.
- Added explanatory notes in the visualization describing how uncertainty is computed and what it represents.
- Updated analysis tasks to be more analytical (focused on identifying patterns and comparisons rather than user interface actions).
- Improved CSS styling to enhance readability, visual hierarchy, and overall presentation of the dashboard.
- Fixed inconsistencies between the two visualizations so that both encode uncertainty in a consistent way.
- Added drawings in the sketch

## 2. Reflect on your experience prioritizing, working on, and completing this assignment. Moving forward, what changes will you make in these areas to work towards better first submissions of assignments? 

In this assignment, we realized that we initially focused too much on making the visualizations functional and interactive, without fully considering how clearly the data was represented or how a user would interpret uncertainty. We also underestimated the importance of consistent encoding and contextual explanation across multiple visualizations. Moving forward, we will start assignments by clearly planning data semantics and visual encoding before implementation.

## 3. Reflect on your learning from this resubmission. What content were you shaky on in the pervious submission, and how did you augment your learning to do better in this submission? What learning strategies did this redo help you develop that you will use on future first submissions of assignments? 

In this resubmission, we improved how uncertainty is represented by replacing the fixed ±2°C values with statistically based confidence intervals and added error bars so both visualizations consistently encode uncertainty. We also added clearer context explaining that the dataset is synthetic and improved labels, tooltips, and analysis tasks to better match the rubric’s expectations. From this process, we learned the importance of planning visual encodings more carefully before coding, ensuring consistency across multiple charts, and checking whether a first-time viewer can correctly interpret the data without additional explanation.
