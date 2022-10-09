import mainMark from 'ASSETS/images/pages/v1alpha/mainMark.png';
import Image from 'COMPONENTS/Image';
const MarkImage = ({ text, amount }) => {

    return <div className='mainMark'>
        {/* svg image should be placed here !!! */}
        <Image
            light={mainMark}
            dark={mainMark}
            alt='Menu'
            // w='23'
            // h='9'
        />


    </div>
};

export default MarkImage;