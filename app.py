@app.route('/api/products')
def get_products():
    """Get all products with optional filtering and sorting"""
    try:
        # Get query parameters
        category = request.args.get('category')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        search = request.args.get('search')
        sort_by = request.args.get('sort_by', 'name')  # Default sort by name
        sort_order = request.args.get('order', 'asc')  # Default ascending order
        
        # Start with base query
        query = Product.query
        
        # Apply filters
        if category:
            query = query.filter(Product.category == category)
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                db.or_(
                    Product.name.ilike(search_term),
                    Product.description.ilike(search_term)
                )
            )
        
        # Apply sorting
        if hasattr(Product, sort_by):
            sort_column = getattr(Product, sort_by)
            if sort_order == 'desc':
                sort_column = sort_column.desc()
            query = query.order_by(sort_column)
        
        # Execute query
        products = query.all()
        
        # Convert to list of dictionaries
        result = [{
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': float(product.price),
            'category': product.category,
            'image_url': product.image_url,
            'stock': product.stock,
            'created_at': product.created_at.isoformat(),
            'updated_at': product.updated_at.isoformat()
        } for product in products]
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500 