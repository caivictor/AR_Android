import { Component, OnInit } from '@angular/core';
import { AR, ARMaterial, ARNode, ARPlaneTappedEventData } from '@nativescript/ar';

@Component({
  selector: 'ns-ar',
  template: `
    <GridLayout>
      <ContentView (loaded)="onLoaded($event)"></ContentView>
    </GridLayout>
  `,
})
export class ARComponent implements OnInit {
  private ar: AR;

  ngOnInit() {
    // Initialize AR here if needed
  }

  onLoaded(args: any) {
    const contentView = args.object;
    this.ar = new AR();
    this.ar.start(contentView);

    this.ar.on(AR.planeTappedEvent, (args: ARPlaneTappedEventData) => {
      console.log("Plane tapped");
      const material = new ARMaterial();
      material.diffuse.contents = 'red';

      const cubeNode = ARNode.createCube(.1);
      cubeNode.position = args.position;
      cubeNode.material = material;

      this.ar.addNode(cubeNode);
    });
  }
}