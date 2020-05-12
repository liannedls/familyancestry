import React, { useState } from 'react'
import classNames from 'classnames';
import { IFamilyExtNode } from 'relatives-tree';
import styles from './FamilyNode.module.css';
import Modal from 'react-modal';

interface Props {
  node: IFamilyExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
  namePerson: string;
}

function Iflink(link){
  if (link){
      return(
        <div>
        hello
        <a href={link}>See more</a>
        </div>
      )
  }
}
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('*')

export default React.memo<Props>(

  function FamilyNode({ node, isRoot, onSubClick, style, namePerson }) {
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }

    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }

    function closeModal(){
      setIsOpen(false);
    }
    return (
      <div className={styles.root} style={style}>
            <button onClick={openModal}
            className={classNames(
              styles.inner,
              styles[node.gender],
              isRoot && styles.isRoot,
            )}
          >
          <p className={styles.person}>
          {namePerson}
          </p>
</button>


        {node.hasSubTree && (
          <div
            className={classNames(styles.sub, styles[node.gender])}
            onClick={() => onSubClick(node.id)}
          />
        )}



        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div className = {styles.popupTop}>
            {node.name}

          </div>
              <div className = {styles.popupContent}>
              DOB: {node.dob}
              DOD: {node.dod}
              {Iflink(node.link)}
              </div>

            <img src={node.src} />
        
        </Modal>
          </div>
    );
  }
);
