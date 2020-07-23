
/** 
 *	Blogger Comments main class
 */

class Comments {
	/** 
	 *	Blogger Comments main class
	 *	@param {Object} options
	 *	@param {HTMLElement} option.wrapper The block this contains comments
	 *	@param {NodeList} option.parentsComment Parents comment item
	 */
	constructor(options) {
		this.wrapper = options.wrapper;

		if(!options.wrapper) {
			this.wrapper = document.getElementById('comments');
		}

		this.thread	= this.wrapper.querySelector('#thread-comment');
		this.iframe	= this.wrapper.querySelector('iframe');
		this.url	= this.iframe.getAttribute('data-src');
		this.form	= this.wrapper.querySelector('#new-comment-from');

		this.parentsComment = Array.prototype.slice.call(this.wrapper.querySelectorAll('li.parent'), 0);

		if(this.parentsComment.length > 0) {
			this.reply();
		}
	}

	reply() {
		/** 
		* example default iframe url
		* https://www.blogger.com/comment-iframe.g?blogID=xxxxxx&postID=xxxxxxx&skin=contempo&blogspotRpcToken=xxxxxx
		* We need to add param `&parentID=xxxxx' to the url iframe for reply each comment
		*/
		// let thread = this.wrapper.querySelector('#threaded-comment-form');
		// let iframe = this.wrapper.querySelector('iframe');
		// let url = iframe.getAttribute('data-src'); // url comment iframe
		// let form = document.querySelector('.comment-form');

		document.addEventListener('DOMContentLoaded', () => {
			this.iframe.setAttribute('src', this.url);
			let replyLinks = Array.prototype.slice.call(
				this.wrapper.getElementsByClassName('reply-link'),
				0
			);
			if(replyLinks.length === this.parentsComment.length) {
				replyLinks.forEach(link => {
					link.addEventListener('click', (e) => {
						e.preventDefault();
						this.appendReplyForm(link.dataset.id);
					});
				})
			}
		});
	}


	/**
	* Append comment reply form into element parent
	* @param {String} id comment id
	* */
	appendReplyForm(id) {
		let commentItem = this.wrapper.querySelector(`[data-id="${ id }"]`);
		commentItem.appendChild(this.thread);
		this.iframe.setAttribute('src', `${ this.url }&parentID=${ id }`);

		/** Add new comment */
		document.getElementById('add-new-comment').addEventListener('click', (e) => {
			e.preventDefault();
			this.form.appendChild(this.thread);
			this.iframe.setAttribute('src', this.url);
		});
	}
}