import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Snow
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        
        console.log(this.resources)

        this.particles;
        this.positions = [], this.velocities = [];

        this.numSnowFlakes = 15000;
        this.maxRanges = 1000, this.minRanges = this.maxRanges * 0.5;
        this.minHeight = 150;

        this.geometry = new THREE.BufferGeometry()

        //this.textureLoader = new THREE.TextureLoader()

        this.addSnowflakes();
    }

    addSnowflakes()
    {

        this.textures = {};
        this.textures.color = this.resources.items.snowFlake;
        this.textures.color.encoding = THREE.sRGBEncoding
        //this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping;
        this.textures.color.wrapT = THREE.RepeatWrapping;

        for(let i=0; i < this.numSnowFlakes; i++)
        {
            this.positions.push(
                Math.floor(Math.random() * this.maxRanges - this.minRanges),
                Math.floor(Math.random() * this.minRanges + this.minHeight),
                Math.floor(Math.random() * this.maxRanges - this.minRanges)
            )

            this.velocities.push(
                Math.floor(Math.random() * 6 - 3) * 0.1,
                Math.floor(Math.random() * 5 + 0.12) * 0.18,
                Math.floor(Math.random() * 6 - 3) * 0.1
            )
        }

        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
        this.geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(this.velocities, 3));


        this.flakeMaterial = new THREE.PointsMaterial({
            size: 4,
            map: this.textures.color,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent : true,
            opacity : 0.7
        })

        this.particles = new THREE.Points(this.geometry, this.flakeMaterial);
        this.scene.add(this.particles);
    }

    update()
    {
        for(let i = 0; i < this.numSnowFlakes * 3; i += 3)
        {
            this.particles.geometry.attributes.position.array[i] -= this.particles.geometry.attributes.velocity.array[i];
            this.particles.geometry.attributes.position.array[i + 1] -= this.particles.geometry.attributes.velocity.array[i + 1];
            this.particles.geometry.attributes.position.array[i + 2] -= this.particles.geometry.attributes.velocity.array[i + 2];
      

            if(this.particles.geometry.attributes.position.array[i + 1] < 0)
                {
                    this.particles.geometry.attributes.position.array[i] =  Math.floor(Math.random() * this.maxRanges - this.minRanges);
                    this.particles.geometry.attributes.position.array[i + 1] = Math.floor(Math.random() * this.minRanges + this.minHeight);
                    this.particles.geometry.attributes.position.array[i + 2] = Math.floor(Math.random() * this.maxRanges - this.minRanges);
                }
        }

        this.particles.geometry.attributes.position.needsUpdate = true;
    }
}