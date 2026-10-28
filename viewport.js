// Rotation applies to the entire stage, so native DOM hit testing follows it.
function gameViewportLayout(width,height,mobile,insets={}){
 const left=insets.left||0,right=insets.right||0,top=insets.top||0,bottom=insets.bottom||0;
 const w=Math.max(1,width-left-right),h=Math.max(1,height-top-bottom);
 const rotated=mobile&&h>w;
 return {rotated,scale:Math.min((rotated?h:w)/1920,(rotated?w:h)/1080),x:left+w/2,y:top+h/2};
}
function isMobileGameDevice(){
 const ua=navigator.userAgent;
 return navigator.userAgentData?.mobile===true||/Android|iPhone|iPad|iPod/i.test(ua)||(/Macintosh|MacIntel/i.test(ua+' '+navigator.platform)&&navigator.maxTouchPoints>1);
}
