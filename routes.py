from flask import jsonify
from flask import render_template
from flask import flash
from flask import current_app
from flask import abort

from middleware import candidate_by_id, sentiment, sentimentgraph, ployaltygraph, painpointgraph, setpainpoint,sentimentreviw
from middleware import candidate
from middleware import add_candidate
from middleware import candidate_update_name
from middleware import random_candidates
from middleware import delete_candidate
from middleware import random_projects
from middleware import add_project


def init_api_routes(app):
    if app:
        app.add_url_rule('/api/candidate/<string:id>', 'candidate_by_id', candidate_by_id, methods=['GET'])
        app.add_url_rule('/api/candidate', 'candidate', candidate, methods=['GET'])
        app.add_url_rule('/api/candidate', 'add_candidate', add_candidate, methods=['POST'])
        app.add_url_rule('/api/candidate/<string:id>/name/<string:new_name>', 'candidate_update_name',
                         candidate_update_name, methods=['PUT'])
        app.add_url_rule('/api/candidate/random', 'get_one_random_candidate', random_candidates,
                         methods=['GET'], defaults={'nr_of_items': 1})
        app.add_url_rule('/api/candidate/random/<int:nr_of_items>', 'get_random_candidates', random_candidates,
                         methods=['GET'])
        app.add_url_rule('/api/candidate/delete/<string:id>', 'delete_candidate', delete_candidate, methods=['DELETE'])
        app.add_url_rule('/api/project/random/<int:nr_of_items>', 'get_random_projects', random_projects,
                         methods=['GET'])
        app.add_url_rule('/api/project', 'add_project', add_project, methods=['POST'])
        app.add_url_rule('/api', 'list_routes', list_routes, methods=['GET'], defaults={'app': app})
        app.add_url_rule('/api/sareviews', 'sentiment', sentiment, methods=['GET'])
        app.add_url_rule('/api/sentimentgraph', 'sentimentgraph', sentimentgraph, methods=['GET'])
        app.add_url_rule('/api/painpointgraph', 'painpointgraph', painpointgraph, methods=['GET'])
        app.add_url_rule('/api/ployaltygraph', 'ployaltygraph', ployaltygraph, methods=['GET'])
        app.add_url_rule('/api/setpainpoint', 'setpainpoint', setpainpoint, methods=['GET'])
        app.add_url_rule('/api/sentimentreviw', 'sentimentreviw', sentimentreviw, methods=['POST'])








def page_index():

    return render_template('index.html', selected_menu_item="index")


def crash_server():
    abort(500)


def init_website_routes(app):
    if app:
       app.add_url_rule('/', 'page_index', page_index, methods=['GET'])
       app.add_url_rule('/crash', 'crash_server', crash_server, methods=['GET'])





def handle_error_404(error):
    flash('Server says: {0}'.format(error), 'error')
    return render_template('404.html', selected_menu_item=None)


def handle_error_500(error):
    flash('Server says: {0}'.format(error), 'error')
    return render_template('500.html', selected_menu_item=None)


def init_error_handlers(app):
    if app:
        app.error_handler_spec[None][404] = handle_error_404
        app.error_handler_spec[None][500] = handle_error_500


def list_routes(app):
    result = []
    for rt in app.url_map.iter_rules():
        result.append({
            'methods': list(rt.methods),
            'route': str(rt)
        })
    return jsonify({'routes': result, 'total': len(result)})
