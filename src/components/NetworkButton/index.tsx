import styles from './NetworkButton.module.scss'
export default function NetworkButton(props) {
    const walletAddress: string = ''
    const chainMeta: any = {logo: ''}
    const onButtonClick = () => {
        console.log('you clicked the button of switch network!')
    }
    return (
        <>
          {
            walletAddress && <div
              className={[styles['network-button'], props.className].join(' ')}
            >
              {
                chainMeta && chainMeta.logo ?
                  (<chainMeta.logo></chainMeta.logo>)
                  : <div className={styles['logo']}></div>
              }
              <div onClick={onButtonClick} className={styles['text']}>{chainMeta && chainMeta.name || 'Switch Network'}</div>
            </div>
          }
        </>
      )
}