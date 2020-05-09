import React, { useState, useCallback } from 'react';
import PinchZoomPan from 'pinch-zoom-pan';
import { IFamilyNode, IFamilyExtNode } from 'relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from './FamilyNode/FamilyNode';
import styles from './Tree.module.css';
import nodes from '../familytree.json';
const myID = 'UIEjvLJMd';

const WIDTH = 120;
const HEIGHT = 130;

export default React.memo<{}>(
  function Tree() {
    const [rootId, setRootId] = useState<string>(myID);
    const onResetClick = useCallback(() => setRootId(myID), []);

    return (
      <div className={styles.root} id="tree">
        <header className={styles.header}>
          <h1 className={styles.title}>
            FamilyTree demo
          </h1>

          <a href="https://github.com/SanichKotikov/react-family-tree-example">GitHub</a>
        </header>
        <PinchZoomPan
          captureWheel
          min={0.5}
          max={2.5}
          className={styles.wrapper}
        >
          <ReactFamilyTree
            nodes={nodes as IFamilyNode[]}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            canvasClassName={styles.tree}
            renderNode={(node: IFamilyExtNode) => (
              <FamilyNode
                key={node.id}
                namePerson={node.name}
                node={node}
                isRoot={node.id === rootId}
                onSubClick={setRootId}
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                }}
              />
            )}
          />
        </PinchZoomPan>
        {rootId !== myID && (
          <div className={styles.reset} onClick={onResetClick}>
            Reset
          </div>
        )}
      </div>
    );
  }
);
