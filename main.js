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
// point is where the camera is located;
// FOV is the angle for its view;
// vector is the direction it's pointed in...
scene.camera = {
	point: {
		x: 0,
		y: 1.8,
		z: 10
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
		point: {
			x: 0,
			y: 3.5,
			z: -3
		},
		color: {
			x: 155,
			y: 200,
			z: 155
		},
		specular: 0.2,
		lambert: 0.7,
		ambient: 0.1,
		radius: 3
	},
	{
		type: 'sphere',
		point: {
			x: -4,
			y: 2,
			z: -1
		},
		color: {
			x: 155,
			y: 155,
			z: 155
		},
		specular: 0.1,
		lambert: 0.9,
		ambient: 0.0,
		radius: 0.2
	},
	{
		type: 'sphere',
		point: {
			x: -4,
			y: 3,
			z: -1
		},
		color: {
			x: 255,
			y: 255,
			z: 255
		},
		specular: 0.2,
		lambert: 0.7,
		ambient: 0.1,
		radius: 0.1
	}
];

