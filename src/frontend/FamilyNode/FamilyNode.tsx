import React, { useState } from 'react'
import classNames from 'classnames';
import { IFamilyExtNode } from 'relatives-tree';
import styles from './FamilyNode.module.css';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';

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
    transform             : 'translate(-50%, -50%)',
    width:'300px',
    height:'250px',
    background:"#e6e2d7"
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
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className = {styles.popupExit}>
          <Button onClick={closeModal}>close</Button>
</div>
              <div className = {styles.popupContent}>
              <h1>
              {node.name}
              </h1>
              <div>
              DOB
              <p>{node.dob}</p>
              </div>
              <div>
              DOD
              <p> {node.dod}</p>
              </div>
              {Iflink(node.link)}


            <img src={node.src} />
            </div>
        </Modal>
          </div>
    );
  }
);
