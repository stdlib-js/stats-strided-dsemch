<!--

@license Apache-2.0

Copyright (c) 2020 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# dsemch

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Calculate the [standard error of the mean][standard-error] of a double-precision floating-point strided array using a one-pass trial mean algorithm.

<section class="intro">

The [standard error of the mean][standard-error] of a finite size sample of size `n` is given by

<!-- <equation class="equation" label="eq:standard_error_of_the_mean" align="center" raw="\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}" alt="Equation for the standard error of the mean."> -->

```math
\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}
```

<!-- <div class="equation" align="center" data-raw-text="\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}" data-equation="eq:standard_error_of_the_mean">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@3ebbbfc49c54971356c0cf8f6282e6720cb07755/lib/node_modules/@stdlib/stats/strided/dsemch/docs/img/equation_standard_error_of_the_mean.svg" alt="Equation for the standard error of the mean.">
    <br>
</div> -->

<!-- </equation> -->

where `σ` is the population [standard deviation][standard-deviation].

Often in the analysis of data, the true population [standard deviation][standard-deviation] is not known _a priori_ and must be estimated from a sample drawn from the population distribution. In this scenario, one must use a sample [standard deviation][standard-deviation] to compute an estimate for the [standard error of the mean][standard-error]

<!-- <equation class="equation" label="eq:standard_error_of_the_mean_estimate" align="center" raw="\sigma_{\bar{x}} \approx \frac{s}{\sqrt{n}}" alt="Equation for estimating the standard error of the mean."> -->

```math
\sigma_{\bar{x}} \approx \frac{s}{\sqrt{n}}
```

<!-- <div class="equation" align="center" data-raw-text="\sigma_{\bar{x}} \approx \frac{s}{\sqrt{n}}" data-equation="eq:standard_error_of_the_mean_estimate">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@3ebbbfc49c54971356c0cf8f6282e6720cb07755/lib/node_modules/@stdlib/stats/strided/dsemch/docs/img/equation_standard_error_of_the_mean_estimate.svg" alt="Equation for estimating the standard error of the mean.">
    <br>
</div> -->

<!-- </equation> -->

where `s` is the sample [standard deviation][standard-deviation].

</section>

<!-- /.intro -->



<section class="usage">

## Usage

To use in Observable,

```javascript
dsemch = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-strided-dsemch@umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var dsemch = require( 'path/to/vendor/umd/stats-strided-dsemch/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/stats-strided-dsemch@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.dsemch;
})();
</script>
```

#### dsemch( N, correction, x, strideX )

Computes the [standard error of the mean][standard-error] of a double-precision floating-point strided array `x` using a one-pass trial mean algorithm.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, -2.0, 2.0 ] );

var v = dsemch( x.length, 1, x, 1 );
// returns ~1.20185
```

The function has the following parameters:

-   **N**: number of indexed elements.
-   **correction**: degrees of freedom adjustment. Setting this parameter to a value other than `0` has the effect of adjusting the divisor during the calculation of the [standard deviation][standard-deviation] according to `N-c` where `c` corresponds to the provided degrees of freedom adjustment. When computing the [standard deviation][standard-deviation] of a population, setting this parameter to `0` is the standard choice (i.e., the provided array contains data constituting an entire population). When computing the corrected sample [standard deviation][standard-deviation], setting this parameter to `1` is the standard choice (i.e., the provided array contains data sampled from a larger population; this is commonly referred to as Bessel's correction).
-   **x**: input [`Float64Array`][@stdlib/array/float64].
-   **strideX**: stride length for `x`.

The `N` and stride parameters determine which elements in the strided array are accessed at runtime. For example, to compute the [standard error of the mean][standard-error] of every other element in `x`,

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, 2.0, 2.0, -7.0, -2.0, 3.0, 4.0, 2.0 ] );

var v = dsemch( 4, 1, x, 2 );
// returns 1.25
```

Note that indexing is relative to the first index. To introduce an offset, use [`typed array`][mdn-typed-array] views.

<!-- eslint-disable stdlib/capitalized-comments -->

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x0 = new Float64Array( [ 2.0, 1.0, 2.0, -2.0, -2.0, 2.0, 3.0, 4.0 ] );
var x1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // start at 2nd element

var v = dsemch( 4, 1, x1, 2 );
// returns 1.25
```

#### dsemch.ndarray( N, correction, x, strideX, offsetX )

Computes the [standard error of the mean][standard-error] of a double-precision floating-point strided array using a one-pass trial mean algorithm and alternative indexing semantics.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 1.0, -2.0, 2.0 ] );

var v = dsemch.ndarray( x.length, 1, x, 1, 0 );
// returns ~1.20185
```

The function has the following additional parameters:

-   **offsetX**: starting index for `x`.

While [`typed array`][mdn-typed-array] views mandate a view offset based on the underlying buffer, the offset parameter supports indexing semantics based on a starting index. For example, to calculate the [standard error of the mean][standard-error] for every other element in `x` starting from the second element

```javascript
var Float64Array = require( '@stdlib/array-float64' );

var x = new Float64Array( [ 2.0, 1.0, 2.0, -2.0, -2.0, 2.0, 3.0, 4.0 ] );

var v = dsemch.ndarray( 4, 1, x, 2, 1 );
// returns 1.25
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   If `N <= 0`, both functions return `NaN`.
-   If `N - c` is less than or equal to `0` (where `c` corresponds to the provided degrees of freedom adjustment), both functions return `NaN`.
-   The underlying algorithm is a specialized case of Neely's two-pass algorithm. As the standard deviation is invariant with respect to changes in the location parameter, the underlying algorithm uses the first strided array element as a trial mean to shift subsequent data values and thus mitigate catastrophic cancellation. Accordingly, the algorithm's accuracy is best when data is **unordered** (i.e., the data is **not** sorted in either ascending or descending order such that the first value is an "extreme" value).

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/random-array-discrete-uniform@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/stats-strided-dsemch@umd/browser.js"></script>
<script type="text/javascript">
(function () {

var x = discreteUniform( 10, -50, 50, {
    'dtype': 'float64'
});
console.log( x );

var v = dsemch( x.length, 1, x, 1 );
console.log( v );

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- C interface documentation. -->



* * *

<section class="references">

## References

-   Neely, Peter M. 1966. "Comparison of Several Algorithms for Computation of Means, Standard Deviations and Correlation Coefficients." _Communications of the ACM_ 9 (7). Association for Computing Machinery: 496–99. doi:[10.1145/365719.365958][@neely:1966a].
-   Ling, Robert F. 1974. "Comparison of Several Algorithms for Computing Sample Means and Variances." _Journal of the American Statistical Association_ 69 (348). American Statistical Association, Taylor & Francis, Ltd.: 859–66. doi:[10.2307/2286154][@ling:1974a].
-   Chan, Tony F., Gene H. Golub, and Randall J. LeVeque. 1983. "Algorithms for Computing the Sample Variance: Analysis and Recommendations." _The American Statistician_ 37 (3). American Statistical Association, Taylor & Francis, Ltd.: 242–47. doi:[10.1080/00031305.1983.10483115][@chan:1983a].
-   Schubert, Erich, and Michael Gertz. 2018. "Numerically Stable Parallel Computation of (Co-)Variance." In _Proceedings of the 30th International Conference on Scientific and Statistical Database Management_. New York, NY, USA: Association for Computing Machinery. doi:[10.1145/3221269.3223036][@schubert:2018a].

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/stats-base/dsem`][@stdlib/stats/base/dsem]</span><span class="delimiter">: </span><span class="description">calculate the standard error of the mean for a double-precision floating-point strided array.</span>
-   <span class="package-name">[`@stdlib/stats-base/dstdevch`][@stdlib/stats/base/dstdevch]</span><span class="delimiter">: </span><span class="description">calculate the standard deviation of a double-precision floating-point strided array using a one-pass trial mean algorithm.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-strided-dsemch.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-strided-dsemch

[test-image]: https://github.com/stdlib-js/stats-strided-dsemch/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/stats-strided-dsemch/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-strided-dsemch/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-strided-dsemch?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-strided-dsemch.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-strided-dsemch/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-strided-dsemch/tree/deno
[deno-readme]: https://github.com/stdlib-js/stats-strided-dsemch/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/stats-strided-dsemch/tree/umd
[umd-readme]: https://github.com/stdlib-js/stats-strided-dsemch/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/stats-strided-dsemch/tree/esm
[esm-readme]: https://github.com/stdlib-js/stats-strided-dsemch/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/stats-strided-dsemch/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-strided-dsemch/main/LICENSE

[standard-error]: https://en.wikipedia.org/wiki/Standard_error

[standard-deviation]: https://en.wikipedia.org/wiki/Standard_deviation

[@stdlib/array/float64]: https://github.com/stdlib-js/array-float64/tree/umd

[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

[@neely:1966a]: https://doi.org/10.1145/365719.365958

[@ling:1974a]: https://doi.org/10.2307/2286154

[@chan:1983a]: https://doi.org/10.1080/00031305.1983.10483115

[@schubert:2018a]: https://doi.org/10.1145/3221269.3223036

<!-- <related-links> -->

[@stdlib/stats/base/dsem]: https://github.com/stdlib-js/stats-base-dsem/tree/umd

[@stdlib/stats/base/dstdevch]: https://github.com/stdlib-js/stats-base-dstdevch/tree/umd

<!-- </related-links> -->

</section>

<!-- /.links -->
