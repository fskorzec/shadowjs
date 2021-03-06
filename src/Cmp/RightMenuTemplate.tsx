import * as React from "react"        ;
import { AppStoreState } from "../Flux/AppStore";
import * as Flux  from "../Flux/Flux" ;

export type RightMenuTemplateProps = {
  refDom : React.MutableRefObject<HTMLDivElement> ;
  state  : AppStoreState                     ;
}

export function RightMenuTemplate(props: RightMenuTemplateProps) {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const pages = props.state.mainMenuitem.pages ?? [];
  const hash = {} as any;

  pages.forEach((_:any) => {
    if (!hash[_.groupTitle]) {
      hash[_.groupTitle] = [];
    }
    hash[_.groupTitle].push(_)
  });

  const items = [<br/>] as JSX.Element[];

  let idx = 0;
  for(var i in hash) {
    if (idx++ > 0) {
      items.push(<hr style={{borderStyle: "dashed"}}/>);
    }
    items.push(<h3>{i}</h3>);
    items.push(hash[i].map((_:any) => <h6 
      className={`${_.path === props.state.subMenuItem?.path ? "text-info" : "text-secondary"}`}
      style={{cursor: "pointer"}} 
      onClick={() => {
        window.history.pushState({path: _.path}, "", _.path);
        setToggleMenu(false);
      }}
    >{_.title}</h6>))
  }
  return <>
    <div className="container-fluid">
      <div className="row">
        <div id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style={{overflowY: "scroll", height: "calc(100vh - 50px)"}}>
          {items}
        </div>
        <div id="main" role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4" style={{overflowY: "scroll", height: "calc(100vh - 50px)"}}>
          <div ref={props.refDom} className="container" style={{display: toggleMenu ? "none" : "block"}}></div>
          <div style={{display: !toggleMenu ? "none" : "block"}}>{items}</div>
        </div>
        <button className="btn btn-outline-primary d-block d-md-none" style={{position: "fixed", bottom: "10px", right: "10px" }} onClick={() => setToggleMenu(!toggleMenu)}>Menu</button>
      </div>
    </div>
  </>;
}