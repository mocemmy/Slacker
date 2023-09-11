import { TailSpin } from 'react-loader-spinner'


function Loading(){
    return (
        <div className='loader-container'>
            <TailSpin color="#541554" height={20} width={20} />
        </div>
    )
}

export default Loading;