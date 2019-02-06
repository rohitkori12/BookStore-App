import React,{ Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setCurrentPage } from '../store/actions/bookActions';


class Pagination extends Component<any,{}>{

    constructor(props:any){
        super(props);
    }

    changePage(Currentpage:any){
       this.props.setCurrentPage(Currentpage);
    }

    render(){
        const pages = this.props.items;
        const Pages_arr=[];
        const active_Page = this.props.activePage;
        
        for(let i=1;i<=pages;i++){
            Pages_arr[i]=i;
        }

        return(
            <div>
                <Button className="inlineBlock" onClick={()=>this.changePage(1)}>First</Button>
                {Pages_arr.map(page=>{
                    return(
                        <div key={page} className="inlineBlock">
                            <Button color="info" onClick={()=>this.changePage(page)} className={active_Page===page?'active':''}>{page}</Button>
                        </div>
                    )
                })}
                <Button className="inlineBlock" onClick={()=>this.changePage(pages)}>Last</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch:any)=>({
      setCurrentPage:(page:any)=> dispatch(setCurrentPage(page))
});

export default connect(null,mapDispatchToProps)(Pagination);
