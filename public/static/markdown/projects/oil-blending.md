## Context & Scope

Crude oil is a complex mix of hydrocarbons, with its exact composition varying based on where it comes from. Different crude oils are often blended throughout the supply chain—from production to refining—primarily to meet specific refinery requirements and optimize profit margin. This blending process is crucial because the resulting distillation profile, which indicates how the blend evaporates at different temperatures, directly determines the types and quantities of refined products like gasoline, diesel, and jet fuel that can be extracted.

This work compares a data-driven machine learning approach with a rule-based approach derived from physical laws. Both models predict the mass-fraction distillation profile of oil blends, using the blend ratio and the individual crude distillation profiles as inputs. At each mass-fraction, the models focus on a "snapshot" to predict the corresponding temperature.

<div style="text-align: center;">
  <img width="593" alt="Image" src="{{PUBLIC_URL}}/static/images/projects/oil-blending/figure1.jpg" />
  <em>Figure 1: Problem definition and example distillation profile.</em>
</div>

## Methods

### A. Physics-Based Modeling

To understand the distillation process, which separates chemicals based on boiling point differences, it's essential to first grasp the fundamentals of the boiling process itself. If we consider the boiling process of pure water under atmospheric pressure, the temperature of liquid water begins to increase from room temperature after heating. This process continues until the liquid reaches 100 °C. At this point, water starts to boil, and its temperature remains constant at 100 °C throughout the entire boiling process, as long as both liquid and vapor phases are present. Once all the liquid water has converted into water vapor, the temperature of the steam will begin to rise again if the heating source remains. Water boils when its vapor pressure becomes equal to the surrounding atmospheric pressure.

Now let's consider a slightly more complicated system, a binary system.
<div style="text-align: center;">
  <img width="293" alt="Image" src="{{PUBLIC_URL}}/static/images/projects/oil-blending/figure2.jpg" />
  <em>Figure 2: A typical distillation phase diagram of a binary system.</em>
</div>

Figure. 2  plots Temperature on the y-axis against Mole Fraction on the x-axis. The x-axis shows the composition of the mixture, ranging from pure A (left side, Mole frac. of A = 1, Mole frac. of B = 0) to pure B (right side, Mole frac. of A = 0, Mole frac. of B = 1). 

The bottom blue region represents conditions (temperature and composition) where the mixture exists entirely in the liquid phase. If you are at a point in this region and heat the mixture, its temperature will rise without any boiling occurring. The green region in the middle represents conditions where both liquid and vapor phases coexist in equilibrium. When a liquid mixture is heated to a temperature within this region, it begins to boil, and both liquid and vapor are present simultaneously. The composition of the liquid and vapor phases in equilibrium at a given temperature in this region are different, as indicated by the two curves. The yellow regin represents conditions where the mixture exists entirely in the vapor (gaseous) phase. If you are at a point in this region and cool the mixture, its temperature will fall without any condensation occurring.

The red curve called the "Bubble Point Curve" separates the "Liquid" region from the "Mix" region. Any point on this curve indicates the temperature at which a liquid mixture of a given composition first begins to boil (forms the first bubble of vapor) upon heating. The composition on the x-axis for a point on this curve represents the liquid composition at the bubble point. The blue curve called the "Dew Point Curve" separates the "Mix" region from the "Vapor" region. Any point on this curve indicates the temperature at which a vapor mixture of a given composition first begins to condense (forms the first drop of liquid) upon cooling. It also indicates the temperature at which the last drop of liquid boils away when heating a liquid mixture, or the temperature at which the last bubble of vapor disappears when cooling a vapor mixture. The composition on the x-axis for a point on this curve represents the vapor composition at the dew point.

Given the crude oil system's intricate nature, characterized by numerous components with unknown compositions, it is impossible to analytically predict its high-dimensional distillation profile. Fortunately, we can provide an estimate by employing a few key assumptions:

  - We adopt a "snapshot" view at each given mass fraction, which implies that the composition change in the liquid phase is negligible for that increment.
  - For a binary system, we assume the boiling point follows the "Bubble Point Curve" and varies linearly with composition.
  - We utilize a "divide and conquer" approach from a microscopic perspective. Specifically, the boiling point of a local binary system is considered to be the weighted average of its individual components' boiling points. This allows us to treat such a local binary system as a pseudo-pure system with that weighted average boiling point.

Consequently, under these assumptions, the distillation profile of a blend can be approximated as the weighted average of the individual distillation profiles.

### B. Data-Driven Modeling

Without further ado, let's explore how to use machine learning to tackle this problem of predicting crude oil distillation profiles. [Crudemonitor](https://crudemonitor.ca) provides distillation profiles for more than 5000 of crude oils with various composition in PDF formats (Figure. 3). One can scrap the files and extract the infomation into machine learning ready data, details are provide [here](https://github.com/anyangml/machine_learning_projects/tree/main/oil_blending).

<p align="center">
  <span style="display: inline-block; text-align: center; margin: 0 10px;">
    <img src="{{PUBLIC_URL}}/static/images/projects/oil-blending/figure3.jpg" width="293">
    <br>
    <em>Figure 3: Example of raw PDF data.</em>
  </span>
  <span style="display: inline-block; text-align: center; margin: 0 10px;">
    <img src="{{PUBLIC_URL}}/static/images/projects/oil-blending/figure4.jpg" width="375">
    <br>
    <em>Figure 4: Proposed ML system flowchart.</em>
  </span>
</p>

## Conclusion

## References
