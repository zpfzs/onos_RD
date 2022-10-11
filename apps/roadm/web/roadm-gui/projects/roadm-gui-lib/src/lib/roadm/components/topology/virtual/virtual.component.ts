import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { TopoService } from '../../../../roadm/services/topo.service';
@Component({
  selector: 'roadm-app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css']
})
export class VirtualComponent implements OnInit {
    public pic3 = "https://pic4.zhimg.com/80/v2-207e1cf40966e6f3f18fd6558015de3f_720w.jpg";
    public svg:any;
//     public dataset = [50,44,120,88,99,167,142];
    public height =1600;
    public width = 1600;
//     public padding = {top:20, left:20, right:20, bottom:20};
//     public rectStep = 35;
//     public rectWidth = 30;
    public nodes:any;
    public simulationNode:any;
    public links:any;
    public simulationLink:any;
    public simulationText:any;
    public simulation:any;

      public sl1:boolean=false;
      public xs1:boolean=false;
      public sl2:boolean=false;
      public xs2:boolean=false;
      public sl3:boolean=false;
      public xs3:boolean=false;

      xianshi1(){
           this.xs1=true;
           this.sl1=false;
      }
      suanlu1(){
           this.sl1=true;
           this.xs1=false;
           setTimeout(() => {this.xianshi1();},2000);
      }
       xianshi2(){
         this.xs2=true;
         this.sl2=false;
       }
       suanlu2(){
         this.sl2=true;
         this.xs2=false;
         setTimeout(() => {this.xianshi2();},2000);
       }
       xianshi3(){
          this.xs3=true;
          this.sl3=false;
       }
       suanlu3(){
          this.sl3=true;
          this.xs3=false;
          setTimeout(() => {this.xianshi3();},2000);
       }
  constructor(public topo:TopoService)
   {
          this.nodes=this.topo.nodes;
          console.log(this.nodes);
          this.links=this.topo.links;
          console.log(this.links);
      }

  ngOnInit() {
  }
   ngAfterViewInit(){
         this.svg=d3.select("#mainsvg").append("svg")
//             .attr("height",this.height).attr("width",this.width).attr('class','insvg');
         let xixixi=this.svg;
         this.simulation=d3.forceSimulation(this.nodes)
                             .force('charge',d3.forceManyBody())
                             .force('link',d3.forceLink(this.links))
                             .force('center',d3.forceCenter(800,800))

         this.simulation.alphaDecay(0.05);
         this.simulation.force('charge')
                             .strength(-100);
         this.simulation.force('link')
                             .id(d => d.id)
                             .distance(100)
                             .strength(0.1)
                             .iterations(1);
         let hahaha=this.simulation;
         this.svg.call(d3.zoom()
                                .scaleExtent([0.1, 10])
                                .on('start', () => { // zoom 事件发生前 将变小手

                                   xixixi.style('cursor', 'pointer')
                                })
                                .on('zoom', () => {

                                   xixixi.attr('transform',
                                      d3.event.transform)
                               })
                               .on('end', () => {
                                   xixixi.style('cursor', 'default')
                               })
                               );
         this.simulationLink=this.svg.selectAll('line').data(this.links).enter().append('line').attr('stroke','black').attr('opacity',0.8).attr('stroke-width',0.5);
         this.simulationNode=this.svg.selectAll('image').data(this.nodes).enter().append('image').attr('xlink:href',function(d){
                                                                                                                                    if(d.r==5){
                                                                                                                                        return "https://pic2.zhimg.com/v2-c59a77ed37528d5fbb0b64c637d496a1_b.jpg";
                                                                                                                                    }
                                                                                                                                    else{
                                                                                                                                        return "https://pic3.zhimg.com/v2-396db2109a439af09cd8d86f1e55c88e_b.jpg";
                                                                                                                                    }
                                                                                                                                    }).attr('width',40).attr('height',40).attr('viewBox','-20 -20 40 40').call(d3.drag().on('start',function(d){
                                                                                                                                                                             if(!d3.event.active){
                                                                                                                                                                                hahaha.alphaTarget(.2).restart();
                                                                                                                                                                             }
                                                                                                                                                                             d.fx=d.x;
                                                                                                                                                                             d.fy=d.y;
                                                                                                                                                                         })
                                                                                                                                                  .on('drag',function(d){
                                                                                                                                                                            d.fx=d3.event.x;
                                                                                                                                                                            d.fy=d3.event.y;
                                                                                                                                                                       })
                                                                                                                                                  .on('end',function(d){
                                                                                                                                                                            if(!d3.event.active){
                                                                                                                                                                                hahaha.alphaTarget(0);

                                                                                                                                                                            }
                                                                                                                                                                            d.fx=null;
                                                                                                                                                                            d.fy=null;
                                                                                                                                                                       })
                                                                                                                      );
         this.simulationText=this.svg.selectAll('text').data(this.nodes).enter().append('text').attr("text-anchor", "middle").text(d => d.name).attr("dy", "40px");
         let LINKS=this.simulationLink;
         let NODES=this.simulationNode;
         let TEXTS=this.simulationText;
         this.simulation.on('tick',function(){
                 LINKS.attr('x1',d => d.source.x).attr('y1',d => d.source.y).attr('x2',d => d.target.x).attr('y2',d => d.target.y);
                 NODES.attr('x', d => d.x-20).attr('y', d => d.y-20);
                  TEXTS.attr('x',d => d.x).attr('y',d => d.y);
         });
//        this.svg.selectAll("rect").data(this.dataset).enter().append("rect").attr("fill","red").attr('x',(d,i)=>this.padding.left+i*this.rectStep).attr('y',(d,i)=>this.height-this.padding.bottom-d).attr("width",this.rectWidth).attr("height",d=>d);
    }
}
