export const getStockColor = (stock) => {
    switch (stock) {
        case 'IN STOCK':
            return '#76ff64';
        case 'IN Hot STOCK':
            return '#fa4c4c';
        case 'out of Stock':
            return '#dee2e6';
        case 'Best Stocks':
            return '#00b0ff';
        default:
            return '#000';
    }
};

export const getDealColor = (deal) => {
    switch (deal) {
        case 'Limited Time Deal':
            return '#d30000';
        case 'Hot sale':
            return '#d3009e';
        case 'sold out':
            return '#ccc';
        case 'Limited Best Deal':
            return '#ffc107';
        case 'Best Limited Deal':
            return '#007ed3';
        default:
            return '#000';
    }
};

export const getBadgeStyle = (type) => {
    switch (type) {
      case 'sale':
        return '#4bd2f7';
      case 'hot':
        return '#65008B';
      case 'sold out':
        return '#d5cdcd';
      case 'best sell':
        return '#d30000';
      case 'best':
        return '#ff8c00';
        case 'new':
        return '#ff00e6';
      default:
        return '#000';
    }
  };

  export const getDiscountStyle = (discount) => {
    const discountValue = parseInt(discount.replace('%', ''), 10);
    if (discountValue >= 0 && discountValue <= 10) {
        return '#FFAB00'; 
    } else if (discountValue > 10 && discountValue <= 20) {
        return '#009EFF'; 
    } else if (discountValue > 20 && discountValue <= 30) {
        return '#C400FF'; 
    } else if (discountValue > 30 && discountValue <= 40) {
        return '#032EFF'; 
    } else if (discountValue > 40 && discountValue <= 50) {
        return '#FF0089'; 
    } else if (discountValue > 50 && discountValue <= 60) {
        return '#cc0000'; 
    } else if (discountValue > 60 && discountValue <= 70) {
        return '#990000'; 
    } else if (discountValue > 70 && discountValue <= 80) {
        return '#02CA12'; 
    } else if (discountValue > 80 && discountValue <= 90) {
        return '#2EA402'; 
    } else if (discountValue > 90 && discountValue <= 100) {
        return '#000000'; 
    } else {
        return '#ccc'; // Default gray
    }
};
