/**
 * Created by jeffdaze on 2019-08-03.
 *
 * Old point renderer here:
 *
 * https://jeffdaze.com/code/canvas/3d/test5.html
 *
 * Heavily inspired by the 'Literate Raytracer here:
 *
 * https://tmcw.github.io/literate-raytracer/
 *
 */

var Vector = {};

Vector.UP = { x: 0, y: 1, z: 0 };
Vector.ZERO = { x: 0, y: 0, z: 0 };

//maybe change this to be RGB?
Vector.WHITE = { x: 255, y: 255, z: 255 };
Vector.ZEROcp = function() {
	return { x: 0, y: 0, z: 0 };
};

//https://en.wikipedia.org/wiki/Dot_product
Vector.dotProduct = function(a, b) {
	return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
};

//https://en.wikipedia.org/wiki/Cross_product
Vector.crossProduct = function(a, b) {
	return {
		x: (a.y * b.z) - (a.z * b.y),
		y: (a.z * b.x) - (a.x * b.z),
		z: (a.x * b.y) - (a.y * b.x)
	};
};

Vector.scale = function(a, t) {
	return {
		x: a.x * t,
		y: a.y * t,
		z: a.z * t
	};
};

//http://en.wikipedia.org/wiki/Unit_vector
//Turn any vector into a vector that has a magnitude of 1.
//http://en.wikipedia.org/wiki/Unit_sphere
Vector.unitVector = function(a) {
	return Vector.scale(a, 1 / Vector.length(a));
};

Vector.add = function(a, b) {
	return {
		x: a.x + b.x,
		y: a.y + b.y,
		z: a.z + b.z
	};
};

//adds three vectors...
Vector.add3 = function(a, b, c) {
	return {
		x: a.x + b.x + c.x,
		y: a.y + b.y + c.y,
		z: a.z + b.z + c.z
	};
};

Vector.subtract = function(a, b) {
	return {
		x: a.x - b.x,
		y: a.y - b.y,
		z: a.z - b.z
	};
};

//https://en.wikipedia.org/wiki/Euclidean_vector#Length
Vector.length = function(a) {
	return Math.sqrt(Vector.dotProduct(a, a));
};

// Given a vector `a`, which is a point in space, and a `normal`, which is
// the angle the point hits a surface, returna  new vector that is reflect
// off of that surface
Vector.reflectThrough = function(a, normal) {
	var d = Vector.scale(normal, Vector.dotProduct(a, normal));
	return Vector.subtract(Vector.scale(d, 2), a);
};

// module export...
// doesn't appear to work anywhere??
// will investigate later...
// export { Vector };