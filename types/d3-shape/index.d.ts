// Type definitions for D3JS d3-shape module 3.1
// Project: https://github.com/d3/d3-shape/, https://d3js.org/d3-shape
// Definitions by: Tom Wanzek <https://github.com/tomwanzek>
//                 Alex Ford <https://github.com/gustavderdrache>
//                 Boris Yankov <https://github.com/borisyankov>
//                 denisname <https://github.com/denisname>
//                 Nathan Bierema <https://github.com/Methuselah96>
//                 Fil <https://github.com/Fil>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Last module patch version validated against: 3.1.0

import { Path } from 'd3-path';

declare global {
    interface CanvasRenderingContext2D {} // tslint:disable-line no-empty-interface
}

// -----------------------------------------------------------------------------------
// Shared Types and Interfaces
// -----------------------------------------------------------------------------------

/**
 * @deprecated
 * This interface is used to bridge the gap between two incompatible versions of TypeScript (see [#25944](https://github.com/Microsoft/TypeScript/pull/25944)).
 * Use `CanvasPathMethods` instead with TS <= 3.0 and `CanvasPath` with TS >= 3.1.
 */
export interface CanvasPath_D3Shape {
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    closePath(): void;
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void;
    lineTo(x: number, y: number): void;
    moveTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    rect(x: number, y: number, w: number, h: number): void;
}

// -----------------------------------------------------------------------------------
// Arc Generator
// -----------------------------------------------------------------------------------

/**
 * Interface corresponding to the minimum data type assumed by the accessor functions of the Arc generator.
 */
export interface DefaultArcObject {
    /**
     * Inner radius of arc.
     */
    innerRadius: number;
    /**
     * Outer radius of arc.
     */
    outerRadius: number;
    /**
     * Start angle of arc. The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     */
    startAngle: number;
    /**
     * End angle of arc. The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     */
    endAngle: number;
    /**
     * Optional. Pad angle of arc in radians.
     */
    padAngle?: number | undefined;
}

/**
 * The arc generator produces a circular or annular sector, as in a pie or donut chart.
 *
 * If the difference between the start and end angles (the angular span) is greater than τ, the arc generator will produce a complete circle or annulus.
 * If it is less than τ, arcs may have rounded corners and angular padding. Arcs are always centered at ⟨0,0⟩; use a transform (see: SVG, Canvas) to move the arc to a different position.
 *
 * See also the pie generator, which computes the necessary angles to represent an array of data as a pie or donut chart; these angles can then be passed to an arc generator.
 *
 * The first generic corresponds to the type of the "this" context within which the arc generator and its accessor functions will be invoked.
 *
 * The second generic corresponds to the datum type for which the arc is to be generated.
 */
export interface Arc<This, Datum> {
    /**
     * Generates an arc for the given arguments.
     *
     * IMPORTANT: If the rendering context of the arc generator is null,
     * then the arc is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the arc is to be generated.
     */
    (this: This, d: Datum, ...args: any[]): string | null;
    /**
     * Generates an arc for the given arguments.
     *
     * IMPORTANT: If the arc generator has been configured with a rendering context,
     * then the arc is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the arc is to be generated.
     */
    (this: This, d: Datum, ...args: any[]): void;

    /**
     * Computes the midpoint [x, y] of the center line of the arc that would be generated by the given arguments.
     *
     * To be consistent with the generated arc, the accessors must be deterministic, i.e., return the same value given the same arguments.
     * The midpoint is defined as (startAngle + endAngle) / 2 and (innerRadius + outerRadius) / 2.
     *
     * Note that this is not the geometric center of the arc, which may be outside the arc;
     * this method is merely a convenience for positioning labels.
     *
     * The method is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that are passed into the arc generator.
     *
     * @param d The datum for which the arc is to be generated.
     */
    centroid(d: Datum, ...args: any[]): [number, number];

    /**
     * Returns the current inner radius accessor, which defaults to a function returning the innerRadius property
     * of the first argument passed into it.
     */
    innerRadius(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the inner radius to the specified number and returns this arc generator.
     *
     * Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, often in conjunction with a sqrt scale.
     * More commonly, a constant inner radius is used for a donut or pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.
     * A negative value is treated as zero.
     *
     * @param radius Constant radius.
     */
    innerRadius(radius: number): this;
    /**
     * Sets the inner radius to the specified function and returns this arc generator.
     *
     * Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, often in conjunction with a sqrt scale.
     * More commonly, a constant inner radius is used for a donut or pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.
     * A negative value is treated as zero.
     *
     * @param radius An accessor function returning a number to be used as a radius. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    innerRadius(radius: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current outer radius accessor, which defaults to a function returning the outerRadius property
     * of the first argument passed into it.
     */
    outerRadius(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the outer radius to the specified number and returns this arc generator.
     *
     * Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart,
     * often in conjunction with a sqrt scale. More commonly, a constant outer radius is used for a pie or donut chart.
     * If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.
     * A negative value is treated as zero.
     *
     * @param radius Constant radius.
     */
    outerRadius(radius: number): this;
    /**
     * Sets the outer radius to the specified function and returns this arc generator.
     *
     * Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart,
     * often in conjunction with a sqrt scale. More commonly, a constant outer radius is used for a pie or donut chart.
     * If the outer radius is smaller than the inner radius, the inner and outer radii are swapped.
     * A negative value is treated as zero.
     *
     * @param radius An accessor function returning a number to be used as a radius. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    outerRadius(radius: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current corner radius accessor, which defaults to a function returning a constant value of zero.
     */
    cornerRadius(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the corner radius to the specified number and returns this arc generator.
     *
     * If the corner radius is greater than zero, the corners of the arc are rounded using circles of the given radius.
     * For a circular sector, the two outer corners are rounded; for an annular sector, all four corners are rounded.
     *
     * The corner radius may not be larger than (outerRadius - innerRadius) / 2.
     * In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect.
     * This is occurs more often with the inner corners.
     *
     * @param radius Constant radius.
     */
    cornerRadius(radius: number): this;
    /**
     * Sets the corner radius to the specified function and returns this arc generator.
     *
     * The corner radius may not be larger than (outerRadius - innerRadius) / 2.
     * In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect.
     * This is occurs more often with the inner corners.
     *
     * @param radius An accessor function returning a number to be used as a radius. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    cornerRadius(radius: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current start angle accessor, which defaults to a function returning the startAngle property
     * of the first argument passed into it.
     */
    startAngle(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the start angle to the specified number and returns this arc generator.
     *
     * The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     * If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.
     *
     * @param angle Constant angle in radians.
     */
    startAngle(angle: number): this;
    /**
     * Sets the start angle to the specified function and returns this arc generator.
     *
     * The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     * If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.
     *
     * @param angle An accessor function returning a number in radians to be used as an angle. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    startAngle(angle: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current end angle accessor, which defaults to a function returning the endAngle property
     * of the first argument passed into it.
     */
    endAngle(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the end angle to the specified number and returns this arc generator.
     *
     * The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     * If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.
     *
     * @param angle Constant angle in radians.
     */
    endAngle(angle: number): this;
    /**
     * Sets the end angle to the specified function and returns this arc generator.
     *
     * The angle is specified in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     * If |endAngle - startAngle| ≥ τ, a complete circle or annulus is generated rather than a sector.
     *
     * @param angle An accessor function returning a number in radians to be used as an angle. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    endAngle(angle: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current pad angle accessor, which defaults to a function returning the padAngle property
     * of the first argument passed into it, or false if no data are passed in or the property is not defined.
     */
    padAngle(): (this: This, d: Datum, ...args: any[]) => number | undefined;
    /**
     * Sets the pad angle to the specified number and returns this arc generator.
     *
     * The pad angle is converted to a fixed linear distance separating adjacent arcs, defined as padRadius * padAngle. This distance is subtracted equally from the start and end of the arc.
     * If the arc forms a complete circle or annulus, as when |endAngle - startAngle| ≥ τ, the pad angle is ignored. If the inner radius or angular span is small relative to the pad angle,
     * it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector.
     * For this reason, padding is typically only applied to annular sectors (i.e., when innerRadius is positive).
     *
     * The recommended minimum inner radius when using padding is outerRadius * padAngle / sin(θ), where θ is the angular span of the smallest arc before padding.
     * For example, if the outer radius is 200 pixels and the pad angle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable inner radius is 100 pixels.
     *
     * Often, the pad angle is not set directly on the arc generator, but is instead computed by the pie generator so as to ensure that the area of padded arcs is proportional to their value;
     * see pie.padAngle. See the pie padding animation for illustration.
     * If you apply a constant pad angle to the arc generator directly, it tends to subtract disproportionately from smaller arcs, introducing distortion.
     *
     * @param angle Constant angle in radians.
     */
    padAngle(angle: number | undefined): this;
    /**
     * Sets the pad angle to the specified function and returns this arc generator.
     *
     * The pad angle is converted to a fixed linear distance separating adjacent arcs, defined as padRadius * padAngle. This distance is subtracted equally from the start and end of the arc.
     * If the arc forms a complete circle or annulus, as when |endAngle - startAngle| ≥ τ, the pad angle is ignored. If the inner radius or angular span is small relative to the pad angle,
     * it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector.
     * For this reason, padding is typically only applied to annular sectors (i.e., when innerRadius is positive).
     *
     * The recommended minimum inner radius when using padding is outerRadius * padAngle / sin(θ), where θ is the angular span of the smallest arc before padding.
     * For example, if the outer radius is 200 pixels and the pad angle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable inner radius is 100 pixels.
     *
     * Often, the pad angle is not set directly on the arc generator, but is instead computed by the pie generator so as to ensure that the area of padded arcs is proportional to their value;
     * see pie.padAngle. See the pie padding animation for illustration.
     * If you apply a constant pad angle to the arc generator directly, it tends to subtract disproportionately from smaller arcs, introducing distortion.
     *
     * @param angle An accessor function returning a number in radians to be used as an angle. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the arc generator.
     */
    padAngle(angle: (this: This, d: Datum, ...args: any[]) => number | undefined): this;

    /**
     * Returns the current pad radius accessor, which defaults to null, indicating that the pad radius should be automatically computed as sqrt(innerRadius * innerRadius + outerRadius * outerRadius).
     */
    padRadius(): ((this: This, d: Datum, ...args: any[]) => number) | null;
    /**
     * Sets the pad radius to the specified function or number and returns this arc generator.
     * The pad radius determines the fixed linear distance separating adjacent arcs, defined as padRadius * padAngle.
     */
    padRadius(radius: null | number | ((this: This, d: Datum, ...args: any[]) => number)): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this arc generator.
     * If context is not specified, returns the current context, which defaults to null.
     */
    context(context: CanvasRenderingContext2D | null): this;
}

/**
 * Constructs a new arc generator with the default settings.
 *
 * Ensure that the accessors used with the arc generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 */
export function arc(): Arc<any, DefaultArcObject>;
/**
 * Constructs a new arc generator with the default settings.
 *
 * Ensure that the accessors used with the arc generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 *
 * The generic corresponds to the datum type representing a arc.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function arc<Datum>(): Arc<any, Datum>;
/**
 * Constructs a new arc generator with the default settings.
 *
 * Ensure that the accessors used with the arc generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 *
 * The first generic corresponds to the type of the "this" context within which the arc generator and its accessor functions will be invoked.
 *
 * The second generic corresponds to the datum type representing a arc.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function arc<This, Datum>(): Arc<This, Datum>;

// -----------------------------------------------------------------------------------
// Pie Generator
// -----------------------------------------------------------------------------------

/**
 * Element of the Arc Datums Array created by invoking the Pie generator.
 *
 * The generic refers to the data type of an element in the input array passed into the Pie generator.
 */
export interface PieArcDatum<T> {
    /**
     * The input datum; the corresponding element in the input data array of the Pie generator.
     */
    data: T;
    /**
     * The numeric value of the arc.
     */
    value: number;
    /**
     * The zero-based sorted index of the arc.
     */
    index: number;
    /**
     * The start angle of the arc.
     * If the pie generator was configured to be used for the arc generator,
     * then the units are in radians with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     */
    startAngle: number;
    /**
     * The end angle of the arc.
     * If the pie generator was configured to be used for the arc generator,
     * then the units are in radians with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     */
    endAngle: number;
    /**
     * The pad angle of the arc. If the pie generator was configured to be used for the arc generator, than the units are in radians.
     */
    padAngle: number;
}

/**
 * The pie generator does not produce a shape directly, but instead computes the necessary angles to represent a tabular dataset as a pie or donut chart;
 * these angles can then be passed to an arc generator.
 *
 * The first generic corresponds to the type of the "this" context within which the pie generator and its accessor functions will be invoked.
 *
 * The second generic refers to the data type of an element in the input array passed into the Pie generator.
 */
export interface Pie<This, Datum> {
    /**
     * Generates a pie for the given array of data, returning an array of objects representing each datum’s arc angles.
     * Any additional arguments are arbitrary; they are simply propagated to the pie generator’s accessor functions along with the this object.
     * The length of the returned array is the same as data, and each element i in the returned array corresponds to the element i in the input data.
     *
     * This representation is designed to work with the arc generator’s default startAngle, endAngle and padAngle accessors.
     * The angular units are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify angles in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * @param data Array of data elements.
     */
    (this: This, data: Datum[], ...args: any[]): Array<PieArcDatum<Datum>>;

    /**
     * Returns the current value accessor, which defaults to a function returning the first argument passed into it.
     * The default value accessor assumes that the input data are numbers, or that they are coercible to numbers using valueOf.
     */
    value(): (d: Datum, i: number, data: Datum[]) => number;
    /**
     * Sets the value accessor to use the specified constant number and returns this pie generator.
     *
     * @param value Constant value to be used.
     */
    value(value: number): this;
    /**
     * Sets the value accessor to use the specified function and returns this pie generator.
     *
     * When a pie is generated, the value accessor will be invoked for each element in the input data array.
     * The default value accessor assumes that the input data are numbers, or that they are coercible to numbers using valueOf.
     * If your data are not simply numbers, then you should specify an accessor that returns the corresponding numeric value for a given datum.
     *
     * @param value A value accessor function, which is invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.
     * It returns a numeric value.
     */
    value(value: (d: Datum, i: number, data: Datum[]) => number): this;

    /**
     * Returns the current data comparator, which defaults to null.
     */
    sort(): ((a: Datum, b: Datum) => number) | null;
    /**
     * Sets the data comparator to the specified function and returns this pie generator.
     *
     * If both the data comparator and the value comparator are null, then arcs are positioned in the original input order.
     * Otherwise, the data is sorted according to the data comparator, and the resulting order is used. Setting the data comparator implicitly sets the value comparator to null.
     *
     * Sorting does not affect the order of the generated arc array which is always in the same order as the input data array; it merely affects the computed angles of each arc.
     * The first arc starts at the start angle and the last arc ends at the end angle.
     *
     * @param comparator A compare function takes two arguments a and b, each elements from the input data array.
     * If the arc for a should be before the arc for b, then the comparator must return a number less than zero;
     * if the arc for a should be after the arc for b, then the comparator must return a number greater than zero;
     * returning zero means that the relative order of a and b is unspecified.
     */
    sort(comparator: (a: Datum, b: Datum) => number): this;
    /**
     * Sets the data comparator to null and returns this pie generator.
     *
     * If both the data comparator and the value comparator are null, then arcs are positioned in the original input order.
     *
     * @param comparator null, to set the pie generator to use the original input order or use the sortValues comparator, if any.
     */
    sort(comparator: null): this;

    /**
     * Returns the current value comparator, which defaults to descending value.
     */
    sortValues(): ((a: number, b: number) => number) | null;
    /**
     * Sets the value comparator to the specified function and returns this pie generator.
     *
     * If both the data comparator and the value comparator are null, then arcs are positioned in the original input order.
     * Otherwise, the data is sorted according to the data comparator, and the resulting order is used.
     * Setting the value comparator implicitly sets the data comparator to null.
     *
     * The value comparator is similar to the data comparator, except the two arguments a and b are values derived from the input data array using the value accessor, not the data elements.
     * If the arc for a should be before the arc for b, then the comparator must return a number less than zero;
     * if the arc for a should be after the arc for b, then the comparator must return a number greater than zero;
     * returning zero means that the relative order of a and b is unspecified.
     */
    sortValues(comparator: ((a: number, b: number) => number) | null): this;

    /**
     * Returns the current start angle accessor, which defaults to a function returning a constant zero.
     */
    startAngle(): (this: This, data: Datum[], ...args: any[]) => number;
    /**
     * Sets the overall start angle of the pie to the specified number and returns this pie generator.
     *
     * The default start angle is zero.
     *
     * The start angle here means the overall start angle of the pie, i.e., the start angle of the first arc.
     * The start angle accessor is invoked once, being passed the same arguments and this context as the pie generator.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify an angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * @param angle A constant angle.
     */
    startAngle(angle: number): this;
    /**
     * Sets the overall start angle of the pie to the specified function and returns this pie generator.
     *
     * The default start angle is zero.
     *
     * The start angle here means the overall start angle of the pie, i.e., the start angle of the first arc.
     * The start angle accessor is invoked once, being passed the same arguments and this context as the pie generator.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify an angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * @param angle An angle accessor function, which is invoked once, being passed the same arguments and this context as the pie generator.
     */
    startAngle(angle: (this: This, data: Datum[], ...args: any[]) => number): this;

    /**
     * Returns the current end angle accessor, which defaults to a function returning a constant 2*pi.
     */
    endAngle(): (this: This, data: Datum[], ...args: any[]) => number;
    /**
     * Sets the overall end angle of the pie to the specified number and returns this pie generator.
     *
     * The default end angle is 2*pi.
     *
     * The end angle here means the overall end angle of the pie, i.e., the end angle of the last arc.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify an angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * The value of the end angle is constrained to startAngle ± τ, such that |endAngle - startAngle| ≤ τ.
     *
     * @param angle A constant angle.
     */
    endAngle(angle: number): this;
    /**
     * Sets the overall end angle of the pie to the specified function and returns this pie generator.
     *
     * The default end angle is 2*pi.
     *
     * The end angle here means the overall end angle of the pie, i.e., the end angle of the last arc.
     * The end angle accessor is invoked once, being passed the same arguments and this context as the pie generator.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator,
     * you should specify an angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
     *
     * The value of the end angle is constrained to startAngle ± τ, such that |endAngle - startAngle| ≤ τ.
     *
     * @param angle An angle accessor function, which is invoked once, being passed the same arguments and this context as the pie generator.
     */
    endAngle(angle: (this: This, data: Datum[], ...args: any[]) => number): this;

    /**
     * Returns the current pad angle accessor, which defaults to a function returning a constant zero.
     */
    padAngle(): (this: This, data: Datum[], ...args: any[]) => number;
    /**
     * Sets the pad angle to the specified number and returns this pie generator.
     *
     * The pad angle here means the angular separation between each adjacent arc.
     * The total amount of padding reserved is the specified angle times the number of elements in the input data array, and at most |endAngle - startAngle|;
     * the remaining space is then divided proportionally by value such that the relative area of each arc is preserved.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator, you should specify an angle in radians.
     *
     * @param angle A constant angle.
     */
    padAngle(angle: number): this;
    /**
     * Sets the pad angle to the specified function and returns this pie generator.
     *
     * The pad angle here means the angular separation between each adjacent arc.
     * The total amount of padding reserved is the specified angle times the number of elements in the input data array, and at most |endAngle - startAngle|;
     * the remaining space is then divided proportionally by value such that the relative area of each arc is preserved.
     * The pad angle accessor is invoked once, being passed the same arguments and this context as the pie generator.
     * The units of angle are arbitrary, but if you plan to use the pie generator in conjunction with an arc generator, you should specify an angle in radians.
     *
     * @param angle An angle accessor function, which is invoked once, being passed the same arguments and this context as the pie generator.
     */
    padAngle(angle: (this: This, data: Datum[], ...args: any[]) => number): this;
}

/**
 * Constructs a new pie generator with the default settings.
 *
 * Ensure that the accessors used with the pie generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 */
export function pie(): Pie<any, number | { valueOf(): number }>;
/**
 * Constructs a new pie generator with the default settings.
 *
 * Ensure that the accessors used with the pie generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 *
 * The generic refers to the data type of an element in the input array passed into the Pie generator.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function pie<Datum>(): Pie<any, Datum>;
/**
 * Constructs a new pie generator with the default settings.
 *
 * Ensure that the accessors used with the pie generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 *
 * The first generic corresponds to the type of the "this" context within which the pie generator and its accessor functions will be invoked.
 *
 * The second generic refers to the data type of an element in the input array passed into the Pie generator.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function pie<This, Datum>(): Pie<This, Datum>;

// -----------------------------------------------------------------------------------
// Line Generators
// -----------------------------------------------------------------------------------

/**
 * The line generator produces a spline or polyline, as in a line chart.
 * Lines also appear in many other visualization types, such as the links in hierarchical edge bundling.
 *
 * The generic refers to the data type of an element in the input array passed into the line generator.
 */
export interface Line<Datum> {
    /**
     * Generates a line for the given array of data. Depending on this line generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the line generator.
     *
     * IMPORTANT: If the rendering context of the line generator is null,
     * then the line is returned as a path data string.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): string | null;
    /**
     * Generates a line for the given array of data. Depending on this line generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the line generator.
     *
     * IMPORTANT: If the line generator has been configured with a rendering context,
     * then the line is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): void;

    /**
     * Returns the current x-coordinate accessor function, which defaults to a function returning first element of a two-element array of numbers.
     */
    x(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets the x accessor to the specified number and returns this line generator.
     *
     * @param x A constant x-coordinate value.
     */
    x(x: number): this;
    /**
     * Sets the x accessor to the specified function and returns this line generator.
     *
     * When a line is generated, the x accessor will be invoked for each defined element in the input data array.
     *
     * The default x accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering,
     * then you should specify a custom accessor.
     *
     * @param x A coordinate accessor function which returns the x-coordinate value. The x accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    x(x: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current y-coordinate accessor function, which defaults to a function returning second element of a two-element array of numbers.
     */
    y(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets the y accessor to the specified number and returns this line generator.
     *
     * @param y A constant y-coordinate value.
     */
    y(y: number): this;
    /**
     * Sets the y accessor to the specified function and returns this line generator.
     *
     * When a line is generated, the y accessor will be invoked for each defined element in the input data array.
     *
     * The default y accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering,
     * then you should specify a custom accessor.
     *
     * @param y A coordinate accessor function which returns the y-coordinate value. The y accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    y(y: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current defined accessor, which defaults to a function returning a constant boolean value of true.
     */
    defined(): (d: Datum, index: number, data: Datum[]) => boolean;
    /**
     * Sets the defined accessor to the specified boolean and returns this line generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a line is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the x and y accessors will subsequently be evaluated and the point will be added to the current line segment.
     * Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point.
     * As a result, the generated line may have several discrete segments.
     *
     * Note that if a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined A boolean constant.
     */
    defined(defined: boolean): this;
    /**
     * Sets the defined accessor to the specified function and returns this line generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a line is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the x and y accessors will subsequently be evaluated and the point will be added to the current line segment.
     * Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point.
     * As a result, the generated line may have several discrete segments.
     *
     * Note that if a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined An accessor function which returns a boolean value. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    defined(defined: (d: Datum, index: number, data: Datum[]) => boolean): this;

    /**
     * Returns the current curve factory, which defaults to curveLinear.
     */
    curve(): CurveFactory | CurveFactoryLineOnly;
    /**
     * Returns the current curve factory, which defaults to curveLinear.
     *
     * The generic allows to cast the curve factory to a specific type, if known.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    curve<C extends CurveFactory | CurveFactoryLineOnly>(): C;
    /**
     * Sets the curve factory and returns this line generator.
     *
     * @param curve A valid curve factory.
     */
    curve(curve: CurveFactory | CurveFactoryLineOnly): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this line generator.
     */
    context(context: CanvasRenderingContext2D | null): this;
}

/**
 * Constructs a new line generator with the default settings.
 *
 * If x or y are specified, sets the corresponding accessors to the specified function or number and returns this line generator.
 *
 * The generic refers to the data type of an element in the input array passed into the line generator.
 *
 * @param x Sets the x accessor
 * @param y Sets the y accessor
 */
export function line<Datum = [number, number]>(
    x?: number | ((d: Datum, index: number, data: Datum[]) => number),
    y?: number | ((d: Datum, index: number, data: Datum[]) => number)
): Line<Datum>;

/**
 * The radial line generator produces a spline or polyline, as in a line chart.
 *
 * A radial line generator is equivalent to the standard Cartesian line generator,
 * except the x and y accessors are replaced with angle and radius accessors.
 * Radial lines are always positioned relative to ⟨0,0⟩; use a transform (see: SVG, Canvas) to change the origin.
 *
 * The generic refers to the data type of an element in the input array passed into the line generator.
 */
export interface LineRadial<Datum> {
    /**
     * Generates a radial line for the given array of data. Depending on this radial line generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the line generator.
     *
     * IMPORTANT: If the rendering context of the radial line generator is null,
     * then the radial line is returned as a path data string.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): string | null;
    /**
     * Generates a radial line for the given array of data. Depending on this radial line generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the radial line generator.
     *
     * IMPORTANT: If the radial line generator has been configured with a rendering context,
     * then the radial line is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): void;

    /**
     * Returns the current angle accessor function, which defaults to a function returning first element of a two-element array of numbers.
     */
    angle(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets the angle accessor to the specified number and returns this radial line generator.
     *
     * @param angle A constant angle value in radians, with 0 at -y (12 o’clock).
     */
    angle(angle: number): this;
    /**
     * Sets the angle accessor to the specified function and returns this radial line generator.
     *
     * When a radial line is generated, the angle accessor will be invoked for each defined element in the input data array.
     *
     * The default angle accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering,
     * then you should specify a custom accessor.
     *
     * @param angle An angle accessor function which returns the angle value in radians, with 0 at -y (12 o’clock). The angle accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    angle(angle: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current radius accessor function, which defaults to a function returning second element of a two-element array of numbers.
     */
    radius(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets the radius accessor to the specified number and returns this radial line generator.
     *
     * @param radius A constant radius value.
     */
    radius(radius: number): this;
    /**
     * Sets the radius accessor to the specified function and returns this radial line generator.
     *
     * When a radial line is generated, the radius accessor will be invoked for each defined element in the input data array.
     *
     * The default radius accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering,
     * then you should specify a custom accessor.
     *
     * @param radius A radius accessor function which returns the radius value. The radius accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    radius(radius: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current defined accessor, which defaults to a function returning a constant boolean value of true.
     */
    defined(): (d: Datum, index: number, data: Datum[]) => boolean;
    /**
     * Sets the defined accessor to the specified boolean and returns this radial line generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a radial line is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the angle and radius accessors will subsequently be evaluated and the point will be added to the current radial line segment.
     * Otherwise, the element will be skipped, the current radial line segment will be ended, and a new radial line segment will be generated for the next defined point.
     * As a result, the generated radial line may have several discrete segments.
     *
     * Note that if a radial line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined A boolean constant.
     */
    defined(defined: boolean): this;
    /**
     * Sets the defined accessor to the specified function and returns this radial line generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a radial line is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the angle and radius accessors will subsequently be evaluated and the point will be added to the current radial line segment.
     * Otherwise, the element will be skipped, the current radial line segment will be ended, and a new radial line segment will be generated for the next defined point.
     * As a result, the generated radial line may have several discrete segments.
     *
     * Note that if a radial line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined An accessor function which returns a boolean value. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    defined(defined: (d: Datum, index: number, data: Datum[]) => boolean): this;

    /**
     * Returns the current curve factory, which defaults to curveLinear.
     */
    curve(): CurveFactory | CurveFactoryLineOnly;
    /**
     * Returns the current curve factory, which defaults to curveLinear.
     *
     * The generic allows to cast the curve factory to a specific type, if known.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    curve<C extends CurveFactory | CurveFactoryLineOnly>(): C;
    /**
     * Sets the curve factory and returns this radial line generator.
     *
     * Note that curveMonotoneX or curveMonotoneY are not recommended for radial lines because they assume that the data is monotonic in x or y,
     * which is typically untrue of radial lines.
     *
     * @param curve A valid curve factory.
     */
    curve(curve: CurveFactory | CurveFactoryLineOnly): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Equivalent to line.context.
     */
    context(context: CanvasRenderingContext2D | null): this;
}

/**
 * Constructs a new radial line generator with the default settings.
 *
 * Ensure that the accessors used with the radial line generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 */
export function lineRadial(): LineRadial<[number, number]>;
/**
 * Constructs a new radial line generator with the default settings.
 *
 * Ensure that the accessors used with the radial line generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 *
 * The generic refers to the data type of an element in the input array passed into the radial line generator.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function lineRadial<Datum>(): LineRadial<Datum>;

/**
 * @deprecated Use LineRadial<Datum>
 */
export type RadialLine<Datum> = LineRadial<Datum>;

/**
 * @deprecated Use lineRadial()
 */
export function radialLine(): RadialLine<[number, number]>;
/**
 * @deprecated Use lineRadial<Datum>()
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function radialLine<Datum>(): RadialLine<Datum>;

// -----------------------------------------------------------------------------------
// Area Generators
// -----------------------------------------------------------------------------------

/**
 * The area generator produces an area, as in an area chart. An area is defined by two bounding lines, either splines or polylines.
 * Typically, the two lines share the same x-values (x0 = x1), differing only in y-value (y0 and y1); most commonly, y0 is defined as a constant representing zero.
 * The first line (the topline) is defined by x1 and y1 and is rendered first; the second line (the baseline) is defined by x0 and y0 and is rendered second, with the points in reverse order.
 * With a curveLinear curve, this produces a clockwise polygon.
 *
 * The generic refers to the data type of an element in the input array passed into the area generator.
 */
export interface Area<Datum> {
    /**
     * Generates an area for the given array of data. Depending on this area generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the area generator.
     *
     * IMPORTANT: If the rendering context of the area generator is null,
     * then the area is returned as a path data string.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): string | null;
    /**
     * Generates an area for the given array of data. Depending on this area generator’s associated curve,
     * the given input data may need to be sorted by x-value before being passed to the area generator.
     *
     * IMPORTANT: If the area generator has been configured with a rendering context,
     * then the area is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): void;

    /**
     * Returns the current x0 accessor. The default x0 accessor is a function returning the first element of a
     * two-element array of numbers.
     */
    x(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets x0 to a constant number x and x1 to null and returns this area generator.
     *
     * Setting x1 to null indicates that the previously-computed x0 value should be reused for the x1 value.
     *
     * @param x A constant value to be used for x0.
     */
    x(x: number): this;
    /**
     * Sets x0 to the specified function x and x1 to null and returns this area generator.
     *
     * The default x0 accessor assumes that the input data are two-element arrays of numbers and returns the first element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param x An accessor function returning a value to be used for x0. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    x(x: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current x0 accessor. The default x0 accessor is a function returning the first element of a
     * two-element array of numbers.
     */
    x0(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets x0 to a constant number and returns this area generator.
     *
     * @param x A constant value.
     */
    x0(x: number): this;
    /**
     * Sets x0 to the specified function and returns this area generator.
     *
     * The default x0 accessor assumes that the input data are two-element arrays of numbers and returns the first element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param x An accessor function returning a value to be used for x0. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    x0(x: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current x1 accessor, which defaults to null, indicating that the previously-computed x0 value should be reused for the x1 value.
     */
    x1(): ((d: Datum, index: number, data: Datum[]) => number) | null;
    /**
     * Sets the x1 accessor to the specified number and returns this area generator.
     */
    x1(x: null | number): this;
    /**
     * Sets x1 to the specified function and returns this area generator.
     *
     * The default x1 accessor is null, indicating that the previously-computed x0 value should be reused for the x1 value.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param x An accessor function returning a value to be used for x1. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    x1(x: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current y0 accessor. The default y0 accessor is a function returning a constant value of zero.
     */
    y(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets y0 to a constant number y and y1 to null and returns this area generator.
     *
     * Setting y1 to null indicates that the previously-computed y0 value should be reused for the y1 value.
     *
     * @param y A constant value to be used for y0.
     */
    y(y: number): this;
    /**
     * Sets y0 to the accessor function y and y1 to null and returns this area generator.
     *
     * The default y0 accessor returns a constant value of zero.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param y An accessor function returning a value to be used for y0. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    y(y: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current y0 accessor. The default y0 accessor is a function a constant value of zero.
     */
    y0(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets y0 to a constant number and returns this area generator.
     *
     * @param y A constant value.
     */
    y0(y: number): this;
    /**
     * Sets y0 to the specified function and returns this area generator.
     *
     * The default y0 accessor is a function which returns a constant value of zero.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param y An accessor function returning a value to be used for y0. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    y0(y: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current y1 accessor or null. The default y1 accessor is a function returning the second element of a
     * two-element array of numbers.
     *
     * If the y1 accessor is null, the previously-computed y0 value is reused for the y1 value.
     */
    y1(): ((d: Datum, index: number, data: Datum[]) => number) | null;
    /**
     * sets the y1 accessor to the specified number and returns this area generator.
     */
    y1(y: null | number): this;
    /**
     * Sets y1 to the specified function and returns this area generator.
     *
     * The default y1 accessor assumes that the input data are two-element arrays of numbers and returns the second element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param y An accessor function returning a value to be used for y1. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    y1(y: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current defined accessor, which defaults to a function returning a constant boolean value of true.
     */
    defined(): (d: Datum, index: number, data: Datum[]) => boolean;
    /**
     * Sets the defined accessor to the specified boolean and returns this area generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     * When an area is generated, the defined accessor will be invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the x0, x1, y0 and y1 accessors will subsequently be evaluated and the point will be added to the current area segment.
     * Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point.
     * As a result, the generated area may have several discrete segments.
     *
     * Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined A boolean constant.
     */
    defined(defined: boolean): this;
    /**
     * Sets the defined accessor to the specified function and returns this area generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     * When an area is generated, the defined accessor will be invoked for each element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the x0, x1, y0 and y1 accessors will subsequently be evaluated and the point will be added to the current area segment.
     * Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point.
     * As a result, the generated area may have several discrete segments.
     *
     * Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined An accessor function which returns a boolean value. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    defined(defined: (d: Datum, index: number, data: Datum[]) => boolean): this;

    /**
     * Returns the current curve factory, which defaults to curveLinear.
     */
    curve(): CurveFactory;
    /**
     * Returns the current curve factory, which defaults to curveLinear.
     *
     * The generic allows to cast the curve factory to a specific type, if known.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    curve<C extends CurveFactory>(): C;
    /**
     * Sets the curve factory and returns this area generator.
     *
     * @param curve A valid curve factory.
     */
    curve(curve: CurveFactory): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this area generator.
     */
    context(context: CanvasRenderingContext2D | null): this;

    /**
     * Returns a new line generator that has this area generator’s current defined accessor, curve and context.
     * The line’s x-accessor is this area’s x0-accessor, and the line’s y-accessor is this area’s y0-accessor.
     */
    lineX0(): Line<Datum>;
    /**
     * Returns a new line generator that has this area generator’s current defined accessor, curve and context.
     * The line’s x-accessor is this area’s x0-accessor, and the line’s y-accessor is this area’s y0-accessor.
     */
    lineY0(): Line<Datum>;

    /**
     * Returns a new line generator that has this area generator’s current defined accessor, curve and context.
     * The line’s x-accessor is this area’s x1-accessor, and the line’s y-accessor is this area’s y0-accessor.
     */
    lineX1(): Line<Datum>;
    /**
     * Returns a new line generator that has this area generator’s current defined accessor, curve and context.
     * The line’s x-accessor is this area’s x0-accessor, and the line’s y-accessor is this area’s y1-accessor.
     */
    lineY1(): Line<Datum>;
}

/**
 * Constructs a new area generator with the default settings.
 *
 * If x, y0 or y1 are specified, sets the corresponding accessors to the specified function or number and returns this area generator.
 *
 * The generic refers to the data type of an element in the input array passed into the area generator.
 *
 * @param x Sets the x accessor.
 * @param y0 Sets the y0 accessor.
 * @param y1 Sets the y1 accessor.
 */
export function area<Datum = [number, number]>(
    x?: number | ((d: Datum, index: number, data: Datum[]) => number),
    y0?: number | ((d: Datum, index: number, data: Datum[]) => number),
    y1?: number | ((d: Datum, index: number, data: Datum[]) => number)
): Area<Datum>;

/**
 * A radial area generator.
 *
 * A radial area generator is equivalent to the standard Cartesian area generator,
 * except the x and y accessors are replaced with angle and radius accessors.
 * Radial areas are always positioned relative to ⟨0,0⟩; use a transform (see: SVG, Canvas) to change the origin.
 *
 * The generic refers to the data type of an element in the input array passed into the area generator.
 */
export interface AreaRadial<Datum> {
    /**
     * Generates a radial area for the given array of data.
     *
     * IMPORTANT: If the rendering context of the radial area generator is null,
     * then the radial area is returned as a path data string.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): string | null;
    /**
     * Generates a radial area for the given array of data.
     *
     * IMPORTANT: If the radial area generator has been configured with a rendering context,
     * then the radial area is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum> | Datum[]): void;

    /**
     * Returns the current startAngle accessor. The default startAngle accessor is a function returning the first element of a
     * two-element array of numbers.
     */
    angle(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets startAngle to a constant number angle and endAngle to null and returns this radial area generator.
     *
     * Setting endAngle to null indicates that the previously-computed startAngle value should be reused for the endAngle value.
     *
     * @param angle A constant value in radians with 0 at -y (12 o’clock).
     */
    angle(angle: number): this;
    /**
     * Sets startAngle to the specified function angle and endAngle to null and returns this radial area generator.
     *
     * The default startAngle accessor assumes that the input data are two-element arrays of numbers and returns the first element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param angle An accessor function returning a value to be used for startAngle in radians with 0 at -y (12 o’clock).
     * The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    angle(angle: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current startAngle accessor. The default startAngle accessor is a function returning the first element of a
     * two-element array of numbers.
     */
    startAngle(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets startAngle to a constant number and returns this radial area generator.
     *
     * @param angle A constant value in radians with 0 at -y (12 o’clock).
     */
    startAngle(angle: number): this;
    /**
     * Sets startAngle to the specified function and returns this radial area generator.
     *
     * The default startAngle accessor assumes that the input data are two-element arrays of numbers and returns the first element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param angle An accessor function returning a value to be used for startAngle in radians with 0 at -y (12 o’clock).
     * The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    startAngle(angle: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current endAngle accessor, which defaults to null, indicating that the previously-computed startAngle value should be reused for the endAngle value.
     */
    endAngle(): ((d: Datum, index: number, data: Datum[]) => number) | null;
    /**
     * Equivalent to area.x1, except the accessor returns the angle in radians, with 0 at -y (12 o’clock).
     * Note: typically angle is used instead of setting separate start and end angles.
     */
    endAngle(angle: null | number): this;
    /**
     * Sets endAngle to the specified function and returns this radial area generator.
     *
     * The default endAngle accessor is null, indicating that the previously-computed startAngle value should be reused for the endAngle value.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param angle An accessor function returning a value to be used for endAngle in radians with 0 at -y (12 o’clock).
     * The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    endAngle(angle: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current innerRadius accessor. The default innerRadius accessor is a function returning a constant value of zero.
     */
    radius(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets innerRadius to a constant number radius and outerRadius to null and returns this radial area generator.
     *
     * Setting outerRadius to null indicates that the previously-computed innerRadius value should be reused for the outerRadius value.
     *
     * @param radius A constant value to be used for innerRadius.
     */
    radius(radius: number): this;
    /**
     * Sets innerRadius to the accessor function radius and outerRadius to null and returns this radial area generator.
     *
     * The default innerRadius accessor returns a constant value of zero.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param radius An accessor function returning a value to be used for innerRadius. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    radius(radius: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current innerRadius accessor. The default innerRadius accessor is a function a constant value of zero.
     */
    innerRadius(): (d: Datum, index: number, data: Datum[]) => number;
    /**
     * Sets innerRadius to a constant number and returns this radial area generator.
     *
     * @param radius A constant value.
     */
    innerRadius(radius: number): this;
    /**
     * Sets innerRadius to the specified function and returns this radial area generator.
     *
     * The default innerRadius accessor is a function which returns a constant value of zero.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param radius An accessor function returning a value to be used for innerRadius. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    innerRadius(radius: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current outerRadius accessor or null. The default outerRadius accessor is a function returning the second element of a
     * two-element array of numbers.
     *
     * If the outerRadius accessor is null, the previously-computed innerRadius value is reused for the outerRadius value.
     */
    outerRadius(): ((d: Datum, index: number, data: Datum[]) => number) | null;
    /**
     * Equivalent to area.y1, except the accessor returns the radius: the distance from the origin ⟨0,0⟩.
     */
    outerRadius(radius: null | number): this;
    /**
     * Sets outerRadius to the specified function and returns this radial area generator.
     *
     * The default outerRadius accessor assumes that the input data are two-element arrays of numbers and returns the second element.
     * If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.
     *
     * @param radius An accessor function returning a value to be used for outerRadius. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    outerRadius(radius: (d: Datum, index: number, data: Datum[]) => number): this;

    /**
     * Returns the current defined accessor, which defaults to a function returning a constant boolean value of true.
     */
    defined(): (d: Datum, index: number, data: Datum[]) => boolean;
    /**
     * Sets the defined accessor to the specified boolean and returns this radial area generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a radial area is generated, the defined accessor will be invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the startAngle, endAngle, innerRadius and outerRadius accessors will subsequently be evaluated and the point will be added to the current area segment.
     *
     * Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point.
     * As a result, the generated area may have several discrete segments.
     *
     * Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined A boolean constant.
     */
    defined(defined: boolean): this;
    /**
     * Sets the defined accessor to the specified function and returns this radial area generator.
     *
     * The default accessor for defined returns a constant boolean value of true, thus assumes that the input data is always defined.
     *
     * When a radial area is generated, the defined accessor will be invoked for each element in the input data array, being passed the element d, the index i, and the array data as three arguments.
     * If the given element is defined (i.e., if the defined accessor returns a truthy value for this element),
     * the startAngle, endAngle, innerRadius and outerRadius accessors will subsequently be evaluated and the point will be added to the current area segment.
     *
     * Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point.
     * As a result, the generated area may have several discrete segments.
     *
     * Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps.
     * In addition, some curves such as curveCardinalOpen only render a visible segment if it contains multiple points.
     *
     * @param defined An accessor function which returns a boolean value. The accessor will be invoked for each defined element in the input data array,
     * being passed the element d, the index i, and the array data as three arguments.
     */
    defined(defined: (d: Datum, index: number, data: Datum[]) => boolean): this;

    /**
     * Returns the current curve factory, which defaults to curveLinear.
     */
    curve(): CurveFactory;
    /**
     * Returns the current curve factory, which defaults to curveLinear.
     *
     * The generic allows to cast the curve factory to a specific type, if known.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    curve<C extends CurveFactory>(): C;
    /**
     * Sets the curve factory and returns this radial area generator.
     *
     * Note that curveMonotoneX or curveMonotoneY are not recommended for radial areas because they assume that the data is monotonic in x or y, which is typically untrue of radial areas.
     *
     * @param curve A valid curve factory.
     */
    curve(curve: CurveFactory): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Equivalent to line.context.
     */
    context(context: CanvasRenderingContext2D | null): this;

    /**
     * Returns a new radial line generator that has this radial area generator’s current defined accessor, curve and context.
     * The line’s angle accessor is this area’s start angle accessor, and the line’s radius accessor is this area’s inner radius accessor.
     */
    lineStartAngle(): LineRadial<Datum>;

    /**
     * Returns a new radial line generator that has this radial area generator’s current defined accessor, curve and context.
     * The line’s angle accessor is this area’s start angle accessor, and the line’s radius accessor is this area’s inner radius accessor.
     */
    lineInnerRadius(): LineRadial<Datum>;

    /**
     * Returns a new radial line generator that has this radial area generator’s current defined accessor, curve and context.
     * The line’s angle accessor is this area’s end angle accessor, and the line’s radius accessor is this area’s inner radius accessor.
     */
    lineEndAngle(): LineRadial<Datum>;

    /**
     * Returns a new radial line generator that has this radial area generator’s current defined accessor, curve and context.
     * The line’s angle accessor is this area’s start angle accessor, and the line’s radius accessor is this area’s outer radius accessor.
     */
    lineOuterRadius(): LineRadial<Datum>;
}

/**
 * Constructs a new radial area generator with the default settings.
 *
 * Ensure that the accessors used with the area generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 */
export function areaRadial(): AreaRadial<[number, number]>;
/**
 * Constructs a new radial area generator with the default settings.
 *
 * Ensure that the accessors used with the area generator correspond to the arguments passed into them,
 * or set them to constants as appropriate.
 *
 * The generic refers to the data type of an element in the input array passed into the radial area generator.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function areaRadial<Datum>(): AreaRadial<Datum>;

/**
 * @deprecated Use AreaRadial interface
 */
export type RadialArea<Datum> = AreaRadial<Datum>;

/**
 * @deprecated Use areaRadial()
 */
export function radialArea(): RadialArea<[number, number]>;
/**
 * @deprecated Use areaRadial<Datum>()
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function radialArea<Datum>(): RadialArea<Datum>;

// -----------------------------------------------------------------------------------
// Curve Factories
// -----------------------------------------------------------------------------------

/**
 * A minimal interface for a curve generator which supports only the rendering of lines.
 * Methods for related to the rendering of areas are not implemented in this minimal interface.
 *
 * While lines are defined as a sequence of two-dimensional [x, y] points,
 * there remains the task of transforming this discrete representation into a continuous shape: i.e., how to interpolate between the points.
 * A curve generator serves this purpose.
 *
 * Curves are typically not constructed or used directly, instead being passed to line.curve.
 */
export interface CurveGeneratorLineOnly {
    /**
     * Indicates the start of a new line segment. Zero or more points will follow.
     */
    lineStart(): void;
    /**
     * Indicates the end of the current line segment.
     */
    lineEnd(): void;
    /**
     * Indicates a new point in the current line segment with the given x- and y-values.
     */
    point(x: number, y: number): void;
}

/**
 * A factory for curve generators addressing only lines, but not areas.
 */
export type CurveFactoryLineOnly =
    /**
     * Returns a "lines only" curve generator which renders to the specified context.
     *
     * @param context A rendering context.
     */
    (context: CanvasRenderingContext2D | Path) => CurveGeneratorLineOnly;

/**
 * A minimal interface for a curve generator which supports the rendering of lines and areas.
 *
 * While lines are defined as a sequence of two-dimensional [x, y] points,
 * and areas are similarly defined by a topline and a baseline,
 * there remains the task of transforming this discrete representation into a continuous shape: i.e., how to interpolate between the points.
 * A curve generator serves this purpose.
 *
 * Curves are typically not constructed or used directly, instead being passed to line.curve and area.curve.
 */
export interface CurveGenerator extends CurveGeneratorLineOnly {
    /**
     * Indicates the start of a new area segment.
     * Each area segment consists of exactly two line segments: the topline, followed by the baseline, with the baseline points in reverse order.
     */
    areaStart(): void;
    /**
     * Indicates the end of the current area segment.
     */
    areaEnd(): void;
}

/**
 * A factory for curve generators addressing both lines and areas.
 */
export type CurveFactory =
    /**
     * Returns a curve generator which renders to the specified context.
     *
     * @param context A rendering context.
     */
    (context: CanvasRenderingContext2D | Path) => CurveGenerator;

/**
 * A curve factory for cubic basis spline generators.
 *
 * The curve generators produce a cubic basis spline using the specified control points.
 * The first and last points are triplicated such that the spline starts at the first point and ends at the last point,
 * and is tangent to the line between the first and second points, and to the line between the penultimate and last points.
 */
export const curveBasis: CurveFactory;

/**
 * A curve factory for closed cubic basis spline generators.
 *
 * The curve generators produce a closed cubic basis spline using the specified control points.
 * When a line segment ends, the first three control points are repeated, producing a closed loop with C2 continuity.
 */
export const curveBasisClosed: CurveFactory;

/**
 * A curve factory for open cubic basis spline generators.
 *
 * The curve generators produce a cubic basis spline using the specified control points.
 * Unlike basis, the first and last points are not repeated, and thus the curve typically does not intersect these points.
 */
export const curveBasisOpen: CurveFactory;

/**
 * Produces a Bézier curve between each pair of points, with horizontal tangents at each point.
 */
export const curveBumpX: CurveFactory;

/**
 * Produces a Bézier curve between each pair of points, with vertical tangents at each point.
 */
export const curveBumpY: CurveFactory;

/**
 * A curve factory for straightened cubic basis spline generators.
 *
 * The curve generators produce a straightened cubic basis spline using the specified control points,
 * with the spline straightened according to the curve’s beta, which defaults to 0.85.
 * This curve is typically used in hierarchical edge bundling to disambiguate connections,
 * as proposed by Danny Holten in Hierarchical Edge Bundles: Visualization of Adjacency Relations in Hierarchical Data.
 *
 * This curve does not implement curve.areaStart and curve.areaEnd; it is intended to work with d3.line, not d3.area.
 */
export interface CurveBundleFactory extends CurveFactoryLineOnly {
    /**
     * Returns a bundle curve factory with the specified beta in the range [0, 1], representing the bundle strength.
     * If beta equals zero, a straight line between the first and last point is produced; if beta equals one,
     * a standard basis spline is produced.
     *
     * @param beta A constant value in the [0, 1] interval.
     */
    beta(beta: number): this;
}

/**
 * A curve factory for straightened cubic basis spline generators.
 *
 * The curve generators produce a straightened cubic basis spline using the specified control points,
 * with the spline straightened according to the curve’s beta, which defaults to 0.85.
 * This curve is typically used in hierarchical edge bundling to disambiguate connections,
 * as proposed by Danny Holten in Hierarchical Edge Bundles: Visualization of Adjacency Relations in Hierarchical Data.
 *
 * This curve does not implement curve.areaStart and curve.areaEnd; it is intended to work with d3.line, not d3.area.
 */
export const curveBundle: CurveBundleFactory;

/**
 * A curve factory for cubic cardinal spline generators.
 */
export interface CurveCardinalFactory extends CurveFactory {
    /**
     * Returns a cardinal curve factory with the specified tension in the range [0, 1].
     * The tension determines the length of the tangents: a tension of one yields all zero tangents, equivalent to curveLinear; a tension of zero produces a uniform Catmull–Rom spline.
     *
     * @param tension A constant in the [0, 1] interval.
     */
    tension(tension: number): this;
}

/**
 * A curve factory for cubic cardinal spline generators.
 *
 * The curve generators produce a cubic cardinal spline using the specified control points, with one-sided differences used for the first and last piece.
 * The default tension is 0.
 */
export const curveCardinal: CurveCardinalFactory;

/**
 * A curve factory for closed cubic cardinal spline generators.
 *
 * The curve generators produce closed cubic cardinal spline using the specified control points.
 * When a line segment ends, the first three control points are repeated, producing a closed loop.
 * The default tension is 0.
 */
export const curveCardinalClosed: CurveCardinalFactory;

/**
 * A curve factory for open cubic cardinal spline generators.
 *
 * The curve generators produce a cubic cardinal spline using the specified control points.
 * Unlike curveCardinal, one-sided differences are not used for the first and last piece,
 * and thus the curve starts at the second point and ends at the penultimate point.
 * The default tension is 0.
 */
export const curveCardinalOpen: CurveCardinalFactory;

/**
 * A curve factory for cubic Catmull–Rom spline generators.
 */
export interface CurveCatmullRomFactory extends CurveFactory {
    /**
     * Returns a cubic Catmull–Rom curve factory with the specified alpha in the range [0, 1].
     * If alpha is zero, produces a uniform spline, equivalent to curveCardinal with a tension of zero;
     * if alpha is one, produces a chordal spline; if alpha is 0.5, produces a centripetal spline.
     * Centripetal splines are recommended to avoid self-intersections and overshoot.
     *
     * @param alpha A constant in the [0, 1] interval.
     */
    alpha(alpha: number): this;
}

/**
 * A curve factory for cubic Catmull–Rom spline generators.
 *
 * The curve generators produce a cubic Catmull–Rom spline using the specified control points and the parameter alpha,
 * which defaults to 0.5, as proposed by Yuksel et al. in On the Parameterization of Catmull–Rom Curves,
 * with one-sided differences used for the first and last piece.
 */
export const curveCatmullRom: CurveCatmullRomFactory;

/**
 * A curve factory for cubic Catmull–Rom spline generators.
 *
 * The curve generators produce a closed cubic Catmull–Rom spline using the specified control points and the parameter alpha,
 * which defaults to 0.5, as proposed by Yuksel et al. When a line segment ends,
 * the first three control points are repeated, producing a closed loop.
 */
export const curveCatmullRomClosed: CurveCatmullRomFactory;

/**
 * A curve factory for cubic Catmull–Rom spline generators.
 *
 * The curve generators produce a cubic Catmull–Rom spline using the specified control points and the parameter alpha,
 * which defaults to 0.5, as proposed by Yuksel et al. Unlike curveCatmullRom, one-sided differences are not used for the first and last piece,
 * and thus the curve starts at the second point and ends at the penultimate point.
 */
export const curveCatmullRomOpen: CurveCatmullRomFactory;

/**
 * A curve factory for polyline generators.
 *
 * The curve generators produce a polyline through the specified points.
 */
export const curveLinear: CurveFactory;

/**
 * A curve factory for closed polyline generators.
 *
 * The curve generators produce a closed polyline through the specified points by repeating the first point when the line segment ends.
 */
export const curveLinearClosed: CurveFactory;

/**
 * A curve factory for cubic spline generators preserving monotonicity in y.
 *
 * The curve generators produce a cubic spline that preserves monotonicity in y, assuming monotonicity in x, as proposed by Steffen in A simple method for monotonic interpolation in one dimension:
 * “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations.
 * Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”
 */
export const curveMonotoneX: CurveFactory;

/**
 * A curve factory for cubic spline generators preserving monotonicity in x.
 *
 * The curve generators produce a cubic spline that preserves monotonicity in x, assuming monotonicity in y, as proposed by Steffen in A simple method for monotonic interpolation in one dimension:
 * “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations.
 * Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”
 */
export const curveMonotoneY: CurveFactory;

/**
 * A curve factory for natural cubic spline generators.
 *
 * The curve generators produce a natural cubic spline with the second derivative of the spline set to zero at the endpoints.
 */
export const curveNatural: CurveFactory;

/**
 * A curve factory for step function (midpoint) generators.
 *
 * The curve generators produce a piecewise constant function (a step function) consisting of alternating horizontal and vertical lines.
 * The y-value changes at the midpoint of each pair of adjacent x-values.
 */
export const curveStep: CurveFactory;

/**
 * A curve factory for step function (after) generators.
 *
 * The curve generators produce a piecewise constant function (a step function) consisting of alternating horizontal and vertical lines.
 * The y-value changes after the x-value.
 */
export const curveStepAfter: CurveFactory;

/**
 * A curve factory for step function (before) generators.
 *
 * The curve generators produce a piecewise constant function (a step function) consisting of alternating horizontal and vertical lines.
 * The y-value changes before the x-value.
 */
export const curveStepBefore: CurveFactory;

// -----------------------------------------------------------------------------------
// LINKS
// -----------------------------------------------------------------------------------

/**
 * An interface describing the default Link Data structure expected
 * by the Link and LinkRadial generators.
 */
export interface DefaultLinkObject {
    /**
     * Source node of the link.
     *
     * For a link in a Cartesian coordinate system, the two element array contains
     * the coordinates [x, y].
     *
     * For a radial link, the two element array contains
     * the coordinates [angle, radius]. The angle is stated in radians, with 0 at -y (12 o’clock).
     * The radius measures the distance from the origin ⟨0,0⟩.
     */
    source: [number, number];
    /**
     * Target node of the link.
     *
     * For a link in a Cartesian coordinate system, the two element array contains
     * the coordinates [x, y].
     *
     * For a radial link, the two element array contains
     * the coordinates [angle, radius]. The angle is stated in radians, with 0 at -y (12 o’clock).
     * The radius measures the distance from the origin ⟨0,0⟩.
     */
    target: [number, number];
}

/**
 * A link generator for a Cartesian coordinate system. The link shape generates a smooth cubic Bézier curve from a
 * source point to a target point. The tangents of the curve at the start and end are either vertical, horizontal.
 *
 * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
 *
 * The second generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The third generic corresponds to the datum type of the source/target node contained in the link object.
 */
export interface Link<This, LinkDatum, NodeDatum> {
    /**
     * Generates a link for the given arguments.
     *
     * IMPORTANT: If the rendering context of the link generator is null,
     * then the link is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the link is to be generated.
     */
    (this: This, d: LinkDatum, ...args: any[]): string | null;
    /**
     * Generates an link for the given arguments.
     *
     * IMPORTANT: If the link generator has been configured with a rendering context,
     * then the link is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the link is to be generated.
     */
    (this: This, d: LinkDatum, ...args: any[]): void;

    /**
     * Returns the current source node accessor function.
     * The default source accessor function returns a two element array [x, y].
     */
    source(): (this: This, d: LinkDatum, ...args: any[]) => NodeDatum;
    /**
     * Sets the source accessor to the specified function and returns this link generator.
     *
     * @param source Source node accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the link generator. The default target accessor function returns a two element array [x, y].
     */
    source(source: (this: This, d: LinkDatum, ...args: any[]) => NodeDatum): this;

    /**
     * Returns the current target node accessor function.
     * The default target accessor function returns a two element array [x, y].
     */
    target(): (this: This, d: LinkDatum, ...args: any[]) => NodeDatum;
    /**
     * Sets the target accessor to the specified function and returns this link generator.
     *
     * @param target Target node accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the link generator. The default target accessor function returns a two element array [x, y].
     */
    target(target: (this: This, d: LinkDatum, ...args: any[]) => NodeDatum): this;

    /**
     * Returns the current x-accessor, which defaults to a function accepting an number array
     * as its argument an returning the first element of the array.
     */
    x(): (this: This, node: NodeDatum, ...args: any[]) => number;
    /**
     * Sets the x-accessor to the specified function and returns this link generator.
     *
     * @param x x-coordinate accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as its first argument a node object followed by all additional arguments that were passed into the link generator.
     */
    x(x: (this: This, node: NodeDatum, ...args: any[]) => number): this;

    /**
     * Returns the current y-accessor, which defaults to a function accepting an number array
     * as its argument an returning the second element of the array.
     */
    y(): (this: This, node: NodeDatum, ...args: any[]) => number;
    /**
     * Sets the y-accessor to the specified function and returns this link generator.
     *
     * @param y y-coordinate accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as its first argument a node object followed by all additional arguments that were passed into the link generator.
     */
    y(y: (this: This, node: NodeDatum, ...args: any[]) => number): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this link generator.
     */
    context(context: CanvasRenderingContext2D | null): this;
}

/**
 * Returns a new link generator using the specified curve. For example, to visualize links in a tree diagram rooted on the top edge of the display
 *
 * With the default settings the link generator accepts a link object conforming to the DefaultLinkObject interface.
 */
export function link(curve: CurveFactory): Link<any, DefaultLinkObject, [number, number]>;
/**
 * Returns a new link generator using the specified curve. For example, to visualize links in a tree diagram rooted on the top edge of the display
 *
 * Important: Ensure that the accessor functions are configured to work with the link and node datum types
 * specified in the generics.
 *
 * The first generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The second generic corresponds to the datum type of the source/target node contained in the link object.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function link<LinkDatum, NodeDatum>(curve: CurveFactory): Link<any, LinkDatum, NodeDatum>;
/**
 * Returns a new link generator using the specified curve. For example, to visualize links in a tree diagram rooted on the top edge of the display
 *
 * Important: Ensure that the accessor functions are configured to work with the link and node datum types
 * specified in the generics.
 *
 * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
 *
 * The second generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The third generic corresponds to the datum type of the source/target node contained in the link object.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function link<This, LinkDatum, NodeDatum>(curve: CurveFactory): Link<This, LinkDatum, NodeDatum>;

/**
 * Shorthand for d3.link with d3.curveBumpX; suitable for visualizing links in a tree diagram rooted on the left edge of the display.
 *
 * With the default settings the link generator accepts a link object conforming to the DefaultLinkObject interface.
 */
export function linkHorizontal(): Link<any, DefaultLinkObject, [number, number]>;
/**
 * Shorthand for d3.link with d3.curveBumpX; suitable for visualizing links in a tree diagram rooted on the left edge of the display.
 *
 * Important: Ensure that the accessor functions are configured to work with the link and node datum types
 * specified in the generics.
 *
 * The first generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The second generic corresponds to the datum type of the source/target node contained in the link object.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function linkHorizontal<LinkDatum, NodeDatum>(): Link<any, LinkDatum, NodeDatum>;
/**
 * Shorthand for d3.link with d3.curveBumpX; suitable for visualizing links in a tree diagram rooted on the left edge of the display.
 *
 * Important: Ensure that the accessor functions are configured to work with the link and node datum types
 * specified in the generics.
 *
 * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
 *
 * The second generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The third generic corresponds to the datum type of the source/target node contained in the link object.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function linkHorizontal<This, LinkDatum, NodeDatum>(): Link<This, LinkDatum, NodeDatum>;

/**
 * Shorthand for d3.link with d3.curveBumpX; suitable for visualizing links in a tree diagram rooted on the left edge of the display.
 *
 * With the default settings the link generator accepts a link object conforming to the DefaultLinkObject interface.
 */
export function linkVertical(): Link<any, DefaultLinkObject, [number, number]>;
/**
 * Shorthand for d3.link with d3.curveBumpY; suitable for visualizing links in a tree diagram rooted on the top edge of the display.
 *
 * Important: Ensure that the accessor functions are configured to work with the link and node datum types
 * specified in the generics.
 *
 * The first generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The second generic corresponds to the datum type of the source/target node contained in the link object.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function linkVertical<LinkDatum, NodeDatum>(): Link<any, LinkDatum, NodeDatum>;
/**
 * Shorthand for d3.link with d3.curveBumpY; suitable for visualizing links in a tree diagram rooted on the top edge of the display.
 *
 * Important: Ensure that the accessor functions are configured to work with the link and node datum types
 * specified in the generics.
 *
 * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
 *
 * The second generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The third generic corresponds to the datum type of the source/target node contained in the link object.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function linkVertical<This, LinkDatum, NodeDatum>(): Link<This, LinkDatum, NodeDatum>;

/**
 * Shorthand for d3.link with d3.curveBumpY; suitable for visualizing links in a tree diagram rooted on the top edge of the display.
 *
 * The first generic corresponds to the type of the "this" context within which the radial link generator and its accessor functions will be invoked.
 *
 * The second generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The third generic corresponds to the datum type of the source/target node contained in the link object.
 */
export interface LinkRadial<This, LinkDatum, NodeDatum> {
    /**
     * Generates a radial link for the given arguments.
     *
     * IMPORTANT: If the rendering context of the radial link generator is null,
     * then the link is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the link is to be generated.
     */
    (this: This, d: LinkDatum, ...args: any[]): string | null;
    /**
     * Generates an link for the given arguments.
     *
     * IMPORTANT: If the radial link generator has been configured with a rendering context,
     * then the link is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * @param d The datum for which the link is to be generated.
     */
    (this: This, d: LinkDatum, ...args: any[]): void;

    /**
     * Returns the current source node accessor function.
     * The default source accessor function returns a two element array [x, y].
     */
    source(): (this: This, d: LinkDatum, ...args: any[]) => NodeDatum;
    /**
     * Sets the source accessor to the specified function and returns this radial link generator.
     *
     * @param source Source node accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the radial link generator. The default target accessor function returns a two element array [x, y].
     */
    source(source: (this: This, d: LinkDatum, ...args: any[]) => NodeDatum): this;

    /**
     * Returns the current target node accessor function.
     * The default target accessor function returns a two element array [x, y].
     */
    target(): (this: This, d: LinkDatum, ...args: any[]) => NodeDatum;
    /**
     * Sets the target accessor to the specified function and returns this radial link generator.
     *
     * @param target Target node accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the radial link generator. The default target accessor function returns a two element array [x, y].
     */
    target(target: (this: This, d: LinkDatum, ...args: any[]) => NodeDatum): this;

    /**
     * Returns the current angle accessor, which defaults to a function accepting an number array
     * as its argument an returning the first element of the array.
     */
    angle(): (this: This, node: NodeDatum, ...args: any[]) => number;
    /**
     * Sets the angle accessor to the specified function and returns this radial link generator.
     * The angle is stated in radians, with 0 at -y (12 o’clock).
     *
     * @param angle Angle accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as its first argument a node object followed by all additional arguments that were passed into the radial link generator.
     */
    angle(angle: (this: This, node: NodeDatum, ...args: any[]) => number): this;

    /**
     * Returns the current radius accessor, which defaults to a function accepting an number array
     * as its argument an returning the second element of the array.
     */
    radius(): (this: This, node: NodeDatum, ...args: any[]) => number;
    /**
     * Sets the radius accessor to the specified function and returns this radial link generator.
     * The radius is measured as the distance from the origin ⟨0,0⟩.
     *
     * @param radius Radius accessor function. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives as its first argument a node object followed by all additional arguments that were passed into the radial link generator.
     */
    radius(radius: (this: This, node: NodeDatum, ...args: any[]) => number): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this link generator.
     */
    context(context: CanvasRenderingContext2D | null): this;
}

/**
 * @deprecated Use LinkRadial interface
 */
export type RadialLink<This, LinkDatum, NodeDatum> = LinkRadial<This, LinkDatum, NodeDatum>;

/**
 * Constructs a new default link generator with radial tangents, for example, to visualize links in a tree diagram
 * rooted in the center of the display.
 *
 * With the default settings the link generator accepts a link object conforming to the DefaultLinkObject interface.
 */
export function linkRadial(): LinkRadial<any, DefaultLinkObject, [number, number]>;
/**
 * Constructs a new link generator with radial tangents, for example, to visualize links in a tree diagram
 * rooted in the center of the display.
 *
 * Important: Ensure that the accessor functions are configured to work with the link and node datum types
 * specified in the generics.
 *
 * The first generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The second generic corresponds to the datum type of the source/target node contained in the link object.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function linkRadial<LinkDatum, NodeDatum>(): LinkRadial<any, LinkDatum, NodeDatum>;
/**
 * Constructs a new link generator with radial tangents, for example, to visualize links in a tree diagram
 * rooted in the center of the display.
 *
 * Important: Ensure that the accessor functions are configured to work with the link and node datum types
 * specified in the generics.
 *
 * The first generic corresponds to the type of the "this" context within which the link generator and its accessor functions will be invoked.
 *
 * The second generic corresponds to the datum type of the link object for which the link is to be generated.
 *
 * The third generic corresponds to the datum type of the source/target node contained in the link object.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function linkRadial<This, LinkDatum, NodeDatum>(): LinkRadial<This, LinkDatum, NodeDatum>;

// -----------------------------------------------------------------------------------
// SYMBOLS
// -----------------------------------------------------------------------------------

/**
 * A Symbol Type.
 *
 * Symbol types are typically not used directly, instead being passed to symbol.type.
 * However, you can define your own symbol type implementation should none of the built-in types satisfy your needs using the following interface.
 * You can also use this low-level interface with a built-in symbol type as an alternative to the symbol generator.
 */
export interface SymbolType {
    /**
     * Renders this symbol type to the specified context with the specified size in square pixels. The context implements the CanvasPath interface.
     * (Note that this is a subset of the CanvasRenderingContext2D interface!)
     *
     * @param context A rendering context implementing CanvasPath.
     * @param size Size of the symbol to draw.
     */
    draw(context: CanvasPath_D3Shape, size: number): void;
}

/**
 * A symbol generator.
 *
 * Symbols provide a categorical shape encoding as is commonly used in scatterplots. Symbols are always centered at ⟨0,0⟩;
 * use a transform (see: SVG, Canvas) to move the arc to a different position.
 *
 * The first generic corresponds to the "this" context within which the symbol generator is invoked.
 * The second generic corresponds to the data type of the datum underlying the symbol.
 */
export interface Symbol<This, Datum> {
    /**
     * Generates a symbol for the given arguments.
     *
     * IMPORTANT: If the rendering context of the symbol generator is null,
     * then the symbol is returned as a path data string.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * For example, with the default settings, no arguments are needed to produce a circle with area 64 square pixels.
     *
     * @param d The datum for which the symbol is to be generated.
     */
    (this: This, d?: Datum, ...args: any[]): string | null;
    /**
     * Generates an symbol for the given arguments.
     *
     * IMPORTANT: If the symbol generator has been configured with a rendering context,
     * then the symbol is rendered to this context as a sequence of path method calls and this function returns void.
     *
     * The "this" context within which this function is invoked, will be the context within which the accessor methods of the generator are invoked.
     * All arguments passed into this function, will be passed to the accessor functions of the generator.
     *
     * For example, with the default settings, no arguments are needed to produce a circle with area 64 square pixels.
     *
     * @param d The datum for which the symbol is to be generated.
     */
    (this: This, d?: Datum, ...args: any[]): void;
    /**
     * Returns the current size accessor, which defaults to a function returning a constant value of 64.
     */
    size(): (this: This, d: Datum, ...args: any[]) => number;
    /**
     * Sets the size to the specified number and returns this symbol generator.
     *
     * @param size A fixed size (area in square pixels).
     */
    size(size: number): this;
    /**
     * Sets the size to the specified function and returns this symbol generator.
     *
     * Specifying the size as a function is useful for constructing a scatterplot with a size encoding.
     * If you wish to scale the symbol to fit a given bounding box, rather than by area, try SVG’s getBBox.
     *
     * @param size An accessor function returning a number to be used as a symbol size. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the symbol generator.
     */
    size(size: (this: This, d: Datum, ...args: any[]) => number): this;

    /**
     * Returns the current symbol type accessor, which defaults to a function returning the circle symbol type.
     */
    type(): (this: This, d: Datum, ...args: any[]) => SymbolType;
    /**
     * Sets the symbol type to the specified symbol type and returns this symbol generator.
     *
     * @param type A constant symbol type.
     */
    type(type: SymbolType): this;
    /**
     * Sets the symbol type to the specified function and returns this symbol generator.
     *
     * @param type An accessor function returning a symbol type. The accessor function is invoked in the same "this" context as the generator was invoked in and
     * receives the same arguments that were passed into the symbol generator. See symbols for the set of built-in symbol types.
     * To implement a custom symbol type, return an object that implements symbolType.draw.
     */
    type(type: (this: This, d: Datum, ...args: any[]) => SymbolType): this;

    /**
     * Returns the current rendering context, which defaults to null.
     */
    context(): CanvasRenderingContext2D | null;
    /**
     * Sets the context and returns this symbol generator.
     */
    context(context: CanvasRenderingContext2D | null): this;
}

/**
 * Constructs a new symbol generator of the specified type and size.
 * If not specified, type defaults to a circle, and size defaults to 64.
 *
 * The first generic corresponds to the "this" context within which the symbol generator is invoked.
 * The second generic corresponds to the data type of the datum underlying the symbol.
 *
 * @param type The specified type.
 * @param size The specified size.
 */
export function symbol<Datum = any>(
    type?: SymbolType | ((this: any, d: Datum, ...args: any[]) => SymbolType),
    size?: number | ((this: any, d: Datum, ...args: any[]) => number)
): Symbol<any, Datum>;

/**
 * Constructs a new symbol generator of the specified type and size.
 * If not specified, type defaults to a circle, and size defaults to 64.
 *
 * The first generic corresponds to the "this" context within which the symbol generator is invoked.
 * The second generic corresponds to the data type of the datum underlying the symbol.
 *
 * @param type The specified type.
 * @param size The specified size.
 */
export function symbol<This, Datum>(
    type?: SymbolType | ((this: This, d: Datum, ...args: any[]) => SymbolType),
    size?: number | ((this: This, d: Datum, ...args: any[]) => number)
): Symbol<This, Datum>;

/**
 * An array containing a set of symbol types designed for filling: circle, cross, diamond, square, star, triangle, and wye.
 * Useful for constructing the range of an ordinal scale should you wish to use a shape encoding for categorical data.
 */
export const symbolsFill: SymbolType[];

/**
 * An array containing a set of symbol types designed for stroking: circle, plus, x, triangle2, asterisk, square2, and diamond2.
 * Useful for constructing the range of an ordinal scale should you wish to use a shape encoding for categorical data.
 */
export const symbolsStroke: SymbolType[];

/**
 * @deprecated Use symbolsFill
 */
export const symbols: SymbolType[];

/**
 * The asterisk symbol type; intended for stroking.
 */
 export const symbolAsterisk: SymbolType;

 /**
  * The circle symbol type; intended for either filling or stroking.
  */
 export const symbolCircle: SymbolType;

 /**
  * The Greek cross symbol type, with arms of equal length; intended for filling.
  */
 export const symbolCross: SymbolType;

 /**
  * The rhombus symbol type; intended for filling.
  */
 export const symbolDiamond: SymbolType;

 /**
  * The rotated square symbol type; intended for stroking.
  */
 export const symbolDiamond2: SymbolType;

 /**
  * The plus symbol type; intended for stroking.
  */
 export const symbolPlus: SymbolType;

 /**
  * The square symbol type; intended for filling.
  */
 export const symbolSquare: SymbolType;

 /**
  * The square2 symbol type; intended for stroking.
  */
 export const symbolSquare2: SymbolType;

 /**
  * The pentagonal star (pentagram) symbol type; intended for filling.
  */
 export const symbolStar: SymbolType;

 /**
  * The up-pointing triangle symbol type; intended for filling.
  */
 export const symbolTriangle: SymbolType;

 /**
  * The up-pointing triangle symbol type; intended for stroking.
  */
 export const symbolTriangle2: SymbolType;

 /**
  * The Y-shape symbol type; intended for filling.
  */
 export const symbolWye: SymbolType;

 /**
  * The X-shape symbol type; intended for stroking.
  */
 export const symbolX: SymbolType;

// -----------------------------------------------------------------------------------
// pointRadial
// -----------------------------------------------------------------------------------

/**
 * Returns the point [x, y] for the given angle and the given radius.
 * @param angle Angle in radians, with 0 at -y (12 o’clock) and positive angles proceeding clockwise.
 * @param radius Radius.
 */
export function pointRadial(angle: number, radius: number): [number, number];

// -----------------------------------------------------------------------------------
// STACKS
// -----------------------------------------------------------------------------------

/**
 * Each series point j in a stack chart corresponds to the jth element in the input data.
 * Each point is represented as an array [y0, y1] where y0 is the lower value (baseline) and y1 is the upper value (topline);
 * the difference between y0 and y1 corresponds to the computed value for this point.
 *
 * SeriesPoint is a [number, number] two-element Array with added data and index properties
 * related to the data element which formed the basis for theSeriesPoint.
 */
export interface SeriesPoint<Datum> extends Array<number> {
    /**
     * Corresponds to y0, the lower value (baseline).
     */
    0: number;
    /**
     * Corresponds to y1, the upper value (topline).
     */
    1: number;
    /**
     * The data element underlying the series point.
     */
    data: Datum;
}

/**
 * The series are determined by the keys accessor; each series i in the returned array corresponds to the ith key.
 * Each series is an array of points, where each point j corresponds to the jth element in the input data.
 *
 * The key for each series is available as series.key, and the index as series.index.
 */
export interface Series<Datum, Key> extends Array<SeriesPoint<Datum>> {
    /**
     * Key of the series.
     */
    key: Key;
    /**
     * Index of the series in the series array returned by stack generator.
     */
    index: number;
}

/**
 * A stack generator.
 *
 * Some shape types can be stacked, placing one shape adjacent to another.
 * For example, a bar chart of monthly sales might be broken down into a multi-series bar chart by product category, stacking bars vertically.
 * This is equivalent to subdividing a bar chart by an ordinal dimension (such as product category) and applying a color encoding.
 *
 * Stacked charts can show overall value and per-category value simultaneously; however, it is typically harder to compare across categories, as only the bottom layer of the stack is aligned.
 * So, chose the stack order carefully, and consider a streamgraph. (See also grouped charts.)
 *
 * Like the pie generator, the stack generator does not produce a shape directly. Instead it computes positions which you can then pass to an area generator or use directly, say to position bars.
 *
 * The first generic corresponds to the "this" context in which the stack generator and its accessor functions are invoked.
 *
 * The second generic corresponds to the data type of an element in the data array passed into the stack generator.
 *
 * The third generic corresponds to the data type of key used to identify a series.
 */
export interface Stack<This, Datum, Key> {
    /**
     * Generates a stack for the given array of data, returning an array representing each series.
     * The resulting array has one element per series. Each series in then typically passed to an area generator to render an area chart,
     * or used to construct rectangles for a bar chart.
     *
     * Any additional arguments are arbitrary; they are simply propagated to the generator’s accessor functions along with the this object.
     *
     * @param data Array of data elements.
     */
    (data: Iterable<Datum>, ...args: any[]): Array<Series<Datum, Key>>;

    /**
     * Returns the current keys accessor, which defaults to the empty array.
     */
    keys(): (this: This, data: Datum[], ...args: any[]) => Key[];
    /**
     * Sets the keys accessor to the specified function or array and returns this stack generator.
     * A series (layer) is generated for each key.
     * Keys are typically strings, but they may be arbitrary values.
     * The series’ key is passed to the value accessor, along with each data point, to compute the point’s value.
     */
    keys(keys: Iterable<Key> | ((this: This, data: Datum[], ...args: any[]) => Key[])): this;

    /**
     * Returns the current value accessor, which defaults to a function return the property corresponding to the relevant key from the data element.
     *
     * Thus, by default the stack generator assumes that the input data is an array of objects, with each object exposing named properties with numeric values; see stack for an example.
     */
    value(): (d: Datum, key: Key, i: number, data: Datum[]) => number;
    /**
     * Sets the value accessor to the specified number and returns this stack generator.
     *
     * @param value A constant value.
     */
    value(value: number): this;
    /**
     * Sets the value accessor to the specified function and returns this stack generator.
     *
     * @param value A value accessor function which returns the numeric value for a given data element and key combination. The accessor function is invoked for each data element and key being passed
     * the datum, the key, index of the data element in the input data array, and the complete data array.
     */
    value(value: (d: Datum, key: Key, i: number, data: Datum[]) => number): this;

    /**
     * Returns the current order accessor, which defaults to stackOrderNone; this uses the order given by the key accessor.
     */
    order(): (series: Series<Datum, Key>) => Iterable<number>;
    /**
     * Sets the order accessor to the specified array and returns this stack generator.
     */
    order(order: null | Iterable<number>): this;
    /**
     * Sets the order accessor to the specified function and returns this stack generator.
     *
     * The stack order is computed prior to the offset; thus, the lower value for all points is zero at the time the order is computed.
     * The index attribute for each series is also not set until after the order is computed.
     *
     * See stack orders for the built-in orders.
     *
     * @param order A function returning a sort order array. It is passed the generated series array and must return an array of numeric indexes representing the stack order.
     */
    order(order: (series: Series<Datum, Key>) => Iterable<number>): this;

    /**
     * Returns the current offset accessor, which defaults to stackOffsetNone; this uses a zero baseline.
     */
    offset(): (series: Series<Datum, Key>, order: number[]) => void;
    /**
     * Reset the offset to use stackOffsetNone; this uses a zero baseline.
     *
     * @param offset null to set to the default stackOffsetNone.
     */
    offset(offset: null): this;
    /**
     * Sets the offset accessor to the specified function and returns this stack generator.
     *
     * @param offset A function which is passed the generated series array and the order index array;
     *               it is then responsible for updating the lower and upper values in the series array.
     */
    offset(offset: (series: Series<Datum, Key>, order: number[]) => void): this;
}

/**
 * Constructs a new stack generator with the default settings.
 *
 * Ensure that the accessors used with the stack generator correspond to the arguments passed into them.
 */
export function stack(): Stack<any, { [key: string]: number }, string>;
/**
 * Constructs a new stack generator with the default settings.
 *
 * Ensure that the accessors used with the stack generator correspond to the arguments passed into them.
 *
 * The generic corresponds to the data type of an element in the data array passed into the stack generator.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function stack<Datum>(): Stack<any, Datum, string>;
/**
 * Constructs a new stack generator with the default settings.
 *
 * Ensure that the accessors used with the stack generator correspond to the arguments passed into them.
 *
 * The first generic corresponds to the data type of an element in the data array passed into the stack generator.
 *
 * The second generic corresponds to the data type of key used to identify a series.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function stack<Datum, Key>(): Stack<any, Datum, Key>;
/**
 * Constructs a new stack generator with the default settings.
 *
 * Ensure that the accessors used with the stack generator correspond to the arguments passed into them.
 *
 * The first generic corresponds to the "this" context in which the stack generator and its accessor functions are invoked.
 *
 * The second generic corresponds to the data type of an element in the data array passed into the stack generator.
 *
 * The third generic corresponds to the data type of key used to identify a series.
 */
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function stack<This, Datum, Key>(): Stack<This, Datum, Key>;

/**
 * Returns a series order such that the earliest series (according to the maximum value) is at the bottom.
 *
 * @param series A series generated by a stack generator.
 */
export function stackOrderAppearance(series: Series<any, any>): number[];

/**
 * Returns a series order such that the smallest series (according to the sum of values) is at the bottom.
 *
 * @param series A series generated by a stack generator.
 */
export function stackOrderAscending(series: Series<any, any>): number[];

/**
 * Returns a series order such that the largest series (according to the sum of values) is at the bottom.
 *
 * @param series A series generated by a stack generator.
 */
export function stackOrderDescending(series: Series<any, any>): number[];

/**
 * Returns a series order such that the larger series (according to the sum of values) are on the inside and the smaller series are on the outside.
 * This order is recommended for streamgraphs in conjunction with the wiggle offset. See Stacked Graphs—Geometry & Aesthetics by Byron & Wattenberg for more information.
 *
 * @param series A series generated by a stack generator.
 */
export function stackOrderInsideOut(series: Series<any, any>): number[];

/**
 * Returns the given series order [0, 1, … n - 1] where n is the number of elements in series. Thus, the stack order is given by the key accessor.
 *
 * @param series A series generated by a stack generator.
 */
export function stackOrderNone(series: Series<any, any>): number[];

/**
 * Returns the reverse of the given series order [n - 1, n - 2, … 0] where n is the number of elements in series. Thus, the stack order is given by the reverse of the key accessor.
 *
 * @param series A series generated by a stack generator.
 */
export function stackOrderReverse(series: Series<any, any>): number[];

/**
 * Applies a zero baseline and normalizes the values for each point such that the topline is always one.
 *
 * @param series A series generated by a stack generator.
 * @param order An array of numeric indexes representing the stack order.
 */
export function stackOffsetExpand(series: Series<any, any>, order: Iterable<number>): void;

/**
 * Positive values are stacked above zero, while negative values are stacked below zero.
 *
 * @param series A series generated by a stack generator.
 * @param order An array of numeric indexes representing the stack order.
 */
export function stackOffsetDiverging(series: Series<any, any>, order: Iterable<number>): void;

/**
 * Applies a zero baseline.
 *
 * @param series A series generated by a stack generator.
 * @param order An array of numeric indexes representing the stack order.
 */
export function stackOffsetNone(series: Series<any, any>, order: Iterable<number>): void;

/**
 * Shifts the baseline down such that the center of the streamgraph is always at zero.
 *
 * @param series A series generated by a stack generator.
 * @param order An array of numeric indexes representing the stack order.
 */
export function stackOffsetSilhouette(series: Series<any, any>, order: Iterable<number>): void;

/**
 * Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the inside-out order.
 * See Stacked Graphs—Geometry & Aesthetics by Bryon & Wattenberg for more information.
 *
 * @param series A series generated by a stack generator.
 * @param order An array of numeric indexes representing the stack order.
 */
export function stackOffsetWiggle(series: Series<any, any>, order: Iterable<number>): void;
