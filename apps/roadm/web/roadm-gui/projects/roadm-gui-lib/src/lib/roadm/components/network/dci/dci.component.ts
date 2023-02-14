import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../roadm/services/storage.service';
import {
    FnService,
    LogService,
    WebSocketService,
    SortDir, TableBaseImpl, TableResponse
} from 'gui2-fw-lib';
@Component({
  selector: 'roadm-app-dci',
  templateUrl: './dci.component.html',
  styleUrls: ['./dci.component.css']
})
export class DciComponent implements OnInit {
  public pic3 = "https://pic4.zhimg.com/80/v2-207e1cf40966e6f3f18fd6558015de3f_720w.jpg";
  public service_type:any[]=['类型1','类型2','类型3'];
  public map_path:any[] = ['路径1','路径2','路径3'];
  public map_way:any[] = ['方式1','方式2','方式3'];
  public ne_list:any[] = ['网元1','网元2','网元3'];
  public port_list:any[] = ['端口1','端口2','端口3'];
  public mf_list:any[] = ['格式1','格式2','格式3'];
  public fec_list:any[] = ['FEC1','FEC2','FEC3'];
  public wl_list:any[] = ['波长1','波长2','波长3'];

  public servicePanel:any = {
    type:'',
    path:'',
    way:'',
    s_ne:'',
    d_ne:'',
    s_port:'',
    d_port:'',
    mf:'',
    fec:'',
    wl:''
  }
  public serviceElement:any = {
    s_ne:'',
    d_ne:'',
    s_disk:'',
    s_port:'',
    d_disk:'',
    d_port:'',
    type:'',
    protect:'',
    status:'',
    create_time:new Date,
    config_status:''
  }
  public serviceList:any[]=[];
  public handlers:any[]=[];
  constructor(public storage:StorageService,
          protected fs: FnService,
          protected log: LogService,
          protected wss: WebSocketService,
  ) { }
  sub() {
  this.serviceElement.s_ne=this.servicePanel.s_ne;
  this.serviceElement.d_ne=this.servicePanel.d_ne;
  this.serviceElement.s_disk='待定义';
  this.serviceElement.s_port=this.servicePanel.s_port;
  this.serviceElement.d_disk='待定义';
  this.serviceElement.d_port=this.servicePanel.d_port;
  this.serviceElement.type=this.servicePanel.type;
  this.serviceElement.protect='待定义';
  this.serviceElement.status='待定义';
  this.serviceElement.create_time=new Date;
  this.serviceElement.config_status='待定义';
  this.serviceList.push(JSON.parse(JSON.stringify(this.serviceElement)));
  this.storage.set('serv',this.serviceElement);
  this.storage.set('servlist',this.serviceList);
  }
  initialize(){
  this.serviceElement={
                          s_ne:'',
                          d_ne:'',
                          s_disk:'',
                          s_port:'',
                          d_disk:'',
                          d_port:'',
                          type:'',
                          protect:'',
                          status:'',
                          create_time:new Date,
                          config_status:''
                        }
  this.serviceList=[];
    this.storage.set('serv',this.serviceElement);
    this.storage.set('servlist',this.serviceList);
  }
  reload(){
  window.location.reload();
  }
  SendMessageToBackward(){
              if(this.wss.isConnected){
                  this.wss.sendEvent('helloworldRequest',{
                  'thefirstword':'hello',
                  'thesecondworld':'world',
                  });
                  this.log.info('websocket发送helloworld成功');
              }
  }
  ReceiveMessageFromBackward(){
        this.wss.bindHandlers(new Map<string,(data)=>void>([
            ['hiResponse',(data)=>{
                this.log.info(data);
            }]
        ]));
        this.handlers.push('hiResponse');
        this.SendMessageToBackward();
  }
  ngOnInit() {
      let list1=this.storage.get('servlist')//导出服务
      if(list1){
        this.serviceList=list1;
      }
//       let obj1=this.storage.get('serv')//导出服务
//       if(obj1){
//         this.serviceElement=obj1;
  }

}
