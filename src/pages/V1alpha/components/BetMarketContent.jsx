import ProgressBar from 'COMPONENTS/ProgressBar';

const BetMarketContent = ({ text, amount }) => {
	
	return <div className = 'v1alpha__alpha__rightBottom_content'>
                <div className = 'v1alpha__alpha__rightBottom_content1'>
                    <label style = {{width:'100%', float:'left'}} className="font-size-12">Vaults Index <div style = {{width:'60%', float:'right'}}><ProgressBar fill={20} bkcolor={1}/></div></label>
                    <label style = {{width:'100%', float:'left'}} className="font-size-12">Assets Index <div style = {{width:'60%', float:'right'}}><ProgressBar fill={60} bkcolor={2} /></div></label>
                    <label style = {{width:'100%', float:'left'}} className="font-size-12">Assets LPN <div style = {{width:'60%', float:'right'}}><ProgressBar fill={40} bkcolor={3} /></div></label>
                    {/* <label style = {{width:'40%', float:'left'}} className="font-size-14">Assets LPN</label> <div style = {{width:'60%', float:'left'}}><ProgressBar fill={40} /></div> */}
                </div>

                <div className = 'v1alpha__alpha__rightBottom_content2'>
                    <label style = {{width:'100%', float:'left'}} className="font-size-12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Velocity <div style = {{width:'60%', float:'right'}}><ProgressBar fill={80} bkcolor={1}/></div></label>
                    <label style = {{width:'100%', float:'left'}} className="font-size-12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Volatility <div style = {{width:'60%', float:'right'}}><ProgressBar fill={60} bkcolor={2} /></div></label>
                    <label style = {{width:'100%', float:'left'}} className="font-size-12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Varience <div style = {{width:'60%', float:'right'}}><ProgressBar fill={40} bkcolor={3} /></div></label>
                </div>
            </div>
};

export default BetMarketContent;