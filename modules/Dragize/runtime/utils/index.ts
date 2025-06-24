export const getOrCreateElementId = (el: HTMLElement, parent: HTMLElement) => {
    if (el.id) return el.id
    const siblings = Array.from(parent.children);
    const idx = siblings.indexOf(el);
    if (!parent.id) {
        parent.id = getOrCreateElementId(parent, parent.parentElement || document.body);
    }
    const selector = `${parent.id}:${idx}`;
    console.log('Selector:', selector);
    el.id = el.id || selector;
    return el.id;
};

export const applyParentStyles = (el: HTMLElement) => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
};

interface DragizeOptionsI {
    parent?: HTMLElement;
    resize?: boolean;
    drag?: boolean;
    snap: number;
    handleSize: number;
}

export const applyDragizeStyles = (el: HTMLElement, options: DragizeOptionsI) => {
    el.style.cursor = 'grab'

}

// Helper to get computed padding
export const getPadding = (el: HTMLElement) => {
    const style = getComputedStyle(el);
    return {
        left: parseFloat(style.paddingLeft) || 0,
        top: parseFloat(style.paddingTop) || 0,
        right: parseFloat(style.paddingRight) || 0,
        bottom: parseFloat(style.paddingBottom) || 0,
    };
};

export const applyPosition = (el: HTMLElement, position: { x: number; y: number; width: number; height: number }) => {

    const padding = getPadding(el.parentElement || document.body);
    el.style.position = 'absolute';

    el.style.left = `calc(${position.x}% + ${padding.left}px)`;
    el.style.top = `calc(${position.y}% + ${padding.top}px)`;
    el.style.width = `${position.width}%`;
    el.style.height = `${position.height}%`;
    el.style.maxWidth = `calc(100% - ${position.x}% - ${padding.left + padding.right}px)`;
    el.style.maxHeight = `calc(100% - ${position.y}% - ${padding.top + padding.bottom}px)`;
    el.style.boxSizing = 'border-box'; // Ensure padding/border are included in width/height
    el.style.overflow = 'hidden'; // Prevent overflow issues
    el.style.userSelect = 'none'; // Prevent text selection during drag
    el.style.touchAction = 'none'; // Disable touch actions to prevent scrolling on touch devices
    el.style.webkitTapHighlightColor = 'transparent'; // Disable tap highlight color on mobile
    el.style.transform = 'translate(0, 0, 0)'; // Force GPU acceleration for smoother rendering
    el.style.willChange = 'transform'; // Hint to the browser that this element will change
};



export const getRelativePosition = (el: HTMLElement, parent: HTMLElement) => {
    let rect = el.getBoundingClientRect();
    let parentRect = parent.getBoundingClientRect();

    // Fallback if parent has zero size
    if (parentRect.width === 0 || parentRect.height === 0) {
        console.warn('Parent has zero width or height. Trying offsetParent or document.body as fallback.');
        const fallbackParent = el.offsetParent as HTMLElement || document.body;
        parentRect = fallbackParent.getBoundingClientRect();
        console.log('Fallback parentRect:', parentRect);
    }

    // If still zero, bail out
    if (parentRect.width === 0 || parentRect.height === 0) {
        console.warn('All parent fallbacks have zero size. Cannot calculate relative position.');
        return { x: 0, y: 0, width: 0, height: 0 };
    }

    // Take parent's padding into account
    const padding = getPadding(parent);
    const contentLeft = parentRect.left + padding.left;
    const contentTop = parentRect.top + padding.top;
    const contentWidth = parentRect.width - padding.left - padding.right;
    const contentHeight = parentRect.height - padding.top - padding.bottom;

    return {
        x: ((rect.left - contentLeft) / contentWidth) * 100,
        y: ((rect.top - contentTop) / contentHeight) * 100,
        width: (rect.width / contentWidth) * 100,
        height: (rect.height / contentHeight) * 100
    };
};

export const getAbsolutePosition = (position: { x: number; y: number; width: number; height: number }, parent: HTMLElement) => {
    const parentRect = parent.getBoundingClientRect();
    const padding = getPadding(parent);
    const contentLeft = parentRect.left + padding.left;
    const contentTop = parentRect.top + padding.top;
    const contentWidth = parentRect.width - padding.left - padding.right;
    const contentHeight = parentRect.height - padding.top - padding.bottom;
    return {
        x: contentLeft + (position.x / 100) * contentWidth,
        y: contentTop + (position.y / 100) * contentHeight,
        width: (position.width / 100) * contentWidth,
        height: (position.height / 100) * contentHeight
    };
};

export const registerChild = (
    el: HTMLElement,
    parent: HTMLElement,
    position?: { x: number; y: number; width: number; height: number }
) => {
    // Debug output
    console.log(
        '[registerChild] el:', el.tagName, el.className,
        'parent:', parent.tagName, parent.className
    );
    let rect = el.getBoundingClientRect();
    let parentRect = parent.getBoundingClientRect();
    console.log('[registerChild] el rect:', rect, 'parent rect:', parentRect);

    let pos = position;
    if (!pos) {
        if (parentRect.width === 0 || parentRect.height === 0) {
            console.warn('[registerChild] Parent has zero size. Please check parent CSS/layout.');
            pos = { x: 0, y: 0, width: 0, height: 0 };
        } else {
            // Take parent's padding into account
            const padding = getPadding(parent);
            const contentLeft = parentRect.left + padding.left;
            const contentTop = parentRect.top + padding.top;
            const contentWidth = parentRect.width - padding.left - padding.right;
            const contentHeight = parentRect.height - padding.top - padding.bottom;

            // If parent is the offsetParent, try offsetLeft/offsetTop for x/y
            if (el.offsetParent === parent) {
                pos = {
                    x: (el.offsetLeft / contentWidth) * 100,
                    y: (el.offsetTop / contentHeight) * 100,
                    width: (rect.width / contentWidth) * 100,
                    height: (rect.height / contentHeight) * 100
                };
            } else {
                pos = {
                    x: ((rect.left - contentLeft) / contentWidth) * 100,
                    y: ((rect.top - contentTop) / contentHeight) * 100,
                    width: (rect.width / contentWidth) * 100,
                    height: (rect.height / contentHeight) * 100
                };
            }
        }
    }
    // Apply styles after position is determined
    el.style.position = 'absolute';
    el.style.left = `${pos.x}%`;
    el.style.top = `${pos.y}%`;
    el.style.width = `${pos.width}%`;
    el.style.height = `${pos.height}%`;
    console.log('[registerChild] Calculated pos:', pos);
    return pos;
};


export const getOrCreateResizeHandle = (el: HTMLElement, options: DragizeOptionsI) => {
    let resizeHandle = el.querySelector('.dragize-resize-handle') as HTMLElement;
    if (!resizeHandle) {
        resizeHandle = document.createElement('div');
        resizeHandle.className = 'dragize-resize-handle';
        resizeHandle.style.width = `${options.handleSize}px`;
        resizeHandle.style.height = `${options.handleSize}px`;
        resizeHandle.style.position = 'absolute';
        resizeHandle.style.right = '0';
        resizeHandle.style.bottom = '0';
        resizeHandle.style.cursor = 'nwse-resize';
        el.appendChild(resizeHandle);
    }
    return resizeHandle;
}


