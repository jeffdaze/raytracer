/**
 * Created by jeffdaze on 2019-08-03.
 */

//find our drawing context...
let c = document.getElementById("c");
let width = 640;
let height = 480;

c.width = width;
c.height = height;

//see if we need this for scaling?
//c.style.cssText = 'width:' + (width * 2) + 'px;height:' + (height*2) + 'px';

let ctx = c.getContext('2d');
let	data = ctx.getImageData(0, 0, width, height);


//scaffold some basic objects...

//scene object to hold everything...
let scene = {};

//camera object;
// 	center is where the camera is located;
// 	FOV is the angle for its view;
// 	vector is the direction it's pointed in...
scene.camera = {
	center: {
		x: 0,
		y: 0,
		z: 0
	},
	fieldOfView: 45,
	vector: {
		x: 0,
		y: 3,
		z: 0
	}
};

//super simple lights; used for lambert shading
//https://en.wikipedia.org/wiki/Lambertian_reflectance
//might also do specular?
//https://en.wikipedia.org/wiki/Specular_reflection
scene.lights = [{
	x: -30,
	y: -10,
	z: 20
}];

//some objects; using spheres cause they are easy!
scene.objects = [
	{
		type: 'sphere',
		center: {
			x: 0,
			y: 0,
			z: 10
		},
		color: {
			r: 0,
			g: 0,
			b: 255
		},
		specular: 0.2,
		lambert: 0.7,
		ambient: 0.1,
		radius: 3
	},
	{
		type: 'sphere',
		center: {
			x: 2,
			y: 0,
			z: 4
		},
		color: {
			r: 0,
			g: 155,
			b: 0
		},
		specular: 0.1,
		lambert: 0.9,
		ambient: 0.0,
		radius: 1
	},
	{
		type: 'sphere',
		center: {
			x: -2,
			y: 0,
			z: 4
		},
		color: {
			r: 255,
			g: 0,
			b: 255
		},
		specular: 0.2,
		lambert: 0.7,
		ambient: 0.1,
		radius: 1
	}
];



//setting up a simple raytracer...

// Scene setup.
let viewport_size = 1;
let projection_plane_z = 1;
let background_color = {
	r: 255,
	g: 255,
	b: 255
};

//convert 2D canvas coordinates to 3D viewport coordinates...
function canvasToViewport(p2d) {
	return {
		x: p2d[0] * viewport_size / c.width,
		y: p2d[1] * viewport_size / c.height,
		z: projection_plane_z
	}
}

//see if we intersect a sphere object; return 't' values...
function intersectRaySphere(origin, direction, sphere) {
	let oc = Vector.subtract(origin, sphere.center);

	let k1 = Vector.dotProduct(direction, direction);
	let k2 = 2*Vector.dotProduct(oc, direction);
	let k3 = Vector.dotProduct(oc, oc) - sphere.radius*sphere.radius;

	let discriminant = k2*k2 - 4*k1*k3;

	if (discriminant < 0) {
		return [Infinity, Infinity];
	}

	let t1 = (-k2 + Math.sqrt(discriminant)) / (2*k1);
	let t2 = (-k2 - Math.sqrt(discriminant)) / (2*k1);

	return [t1, t2];
}


//shoot our rays from a point in a particular direction until we hit something or exceed max distance...
function traceRay(origin, direction, min_t, max_t) {
	let closest_t = Infinity;
	let closest_obj = null;

	//get objects from scene list...
	let spheres = scene.objects;

	//@TODO figure out what kind of objects we're dealing with and use the appropriate intersector...
	for (let i = 0; i < spheres.length; i++) {
		var ts = intersectRaySphere(origin, direction, spheres[i]);
		if (ts[0] < closest_t && min_t < ts[0] && ts[0] < max_t) {
			closest_t = ts[0];
			closest_obj = spheres[i];
		}
		if (ts[1] < closest_t && min_t < ts[1] && ts[1] < max_t) {
			closest_t = ts[1];
			closest_obj = spheres[i];
		}
	}

	if (closest_obj == null) {
		return background_color;
	}

	return closest_obj.color;
}


function renderScene(){
	//iterate through our pixels...
	for (let x = -c.width/2; x < c.width/2; x++) {
		for (let y = -c.height/2; y < c.height/2; y++) {
			//figure out which way to shoot our rays...
			let direction = canvasToViewport([x, y]);

			//calculate the color at an intersection point...
			let color = traceRay(scene.camera.center, direction, 1, Infinity);
			setPixel(data, x, y, color.r, color.g, color.b, 255);
		}
	}

	//don't forget to actually output the pixels!!!
	ctx.putImageData(data, 0, 0);
}

//utility functions...

//single pixel setting...
function setPixel(imageData, x, y, r, g, b, a) {

	//quadrants are all wrong; let's fix the orientation so it renders sensibly...
	x = c.width/2 + x;
	y = c.height/2 - y - 1;

	if (x < 0 || x >= c.width || y < 0 || y >= c.height) {
		return;
	}

	//address each component of the pixel here...
	let index = (x + y * imageData.width) * 4;
	imageData.data[index+0] = r;
	imageData.data[index+1] = g;
	imageData.data[index+2] = b;
	imageData.data[index+3] = a;
}


//now render everything...
renderScene();