import React from 'react';
import classNames from 'classnames';
import { IFamilyExtNode } from 'relatives-tree';
import styles from './FamilyNode.module.css';
import Popup from "reactjs-popup";

interface Props {
  node: IFamilyExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
  namePerson: string;
}

export default React.memo<Props>(
  function FamilyNode({ node, isRoot, onSubClick, style, namePerson }) {
    return (
      <div className={styles.root} style={style}>
        <Popup trigger={<button
          className={classNames(
            styles.inner,
            styles[node.gender],
            isRoot && styles.isRoot,
          )}
        ><p>{namePerson}</p></button>} position="top left">
            {close => (
              <div>
                {node.id}
                <button className="close" onClick={close}>
                  &times;
                </button>
              </div>
            )}
          </Popup>
        {node.hasSubTree && (
          <div
            className={classNames(styles.sub, styles[node.gender])}
            onClick={() => onSubClick(node.id)}
          />
        )}
      </div>
    );
  }
);
